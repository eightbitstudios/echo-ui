angular.module('echo.directives.fileUpload', [])
  .directive('fileUpload', function() {
    return {
      restrict: 'E',
      scope: {
        fileList: '='
      },
      templateUrl: 'app/common/directives/file-upload/file-upload.template.html',
      link: function(scope, element) {
        scope.fileList = [];
        var fileInput = element.find('input[type="file"]');

        function fileAdded() {
          if (fileInput[0].files.length > 0) {
            scope.fileList.push(_.get(fileInput[0].files, '0'));
            scope.$apply();
          }
        }

        fileInput.bind('change', fileAdded);
        fileInput[0].addEventListener('dragenter', fileAdded, false);
        fileInput[0].addEventListener('dragover', fileAdded, false);
        fileInput[0].addEventListener('drop', fileAdded, false);
      }
    };
  });