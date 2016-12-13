angular.module('echo.directives.fileUpload', [
    'echo.models.file'
  ])
  .directive('fileUpload', function(FileModel) {
    return {
      restrict: 'A',
      scope: {
        fileUpload: '=',
        uploadConstraints: '=',
        error: '='
      },
      link: function(scope, element) {
        scope.fileUpload = [];

        element.attr('accept', _.replace(scope.uploadConstraints.documentTypes, /[\w]+\//g, ' .'));

        var newFileAdded = function() {

          if (element[0].files.length > 0) {
            var file = new FileModel(_.get(element[0].files, '0'));

            if (file.isValidFileType(scope.uploadConstraints.documentTypes) &&
              file.isValidFileSize(scope.uploadConstraints.fileSizeLimit)) {
              scope.error = null;
              scope.fileUpload.push(file);
              element.val(''); // Clear out saved file incase user tries to re-add the file     
            } else if (!file.isValidFileType(scope.uploadConstraints.documentTypes)) {
              scope.error = scope.uploadConstraints.validationMessages.fileType;
            } else if (!file.isValidFileSize(scope.uploadConstraints.fileSizeLimit)) {
              scope.error = scope.uploadConstraints.validationMessages.fileSize;
            }
             scope.$apply();
          }
        };

        element.bind('change', newFileAdded);
        element[0].addEventListener('ondrop', newFileAdded, false);
      }
    };
  });