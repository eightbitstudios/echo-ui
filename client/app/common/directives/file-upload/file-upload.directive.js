angular.module('echo.directives.fileUpload', [
    'echo.models.file'
  ])
  .directive('fileUpload', function(FileModel) {
    return {
      restrict: 'A',
      scope: {
        fileUpload: '=',
        uploadConstraints: '='
      },
      link: function(scope, element) {
        scope.fileUpload = [];

        element.attr('accept', _.replace(scope.uploadConstraints.documentTypes, /[\w]+\//g, ' .'));

        var newFileAdded = function() {
          var file = new FileModel(_.get(element[0].files, '0'));

          if (file.isValidFileType(scope.uploadConstraints.documentTypes) &&
            file.isValidFileSize(scope.uploadConstraints.fileSizeLimit)) {

            file.getPageCount().then(function() {
              scope.fileUpload.push(file);
              element.val(''); // Clear out saved file incase user tries to re-add a file
            });
          }
        };

        element.bind('change', newFileAdded);
        element[0].addEventListener('ondrop', newFileAdded, false);
      }
    };
  });