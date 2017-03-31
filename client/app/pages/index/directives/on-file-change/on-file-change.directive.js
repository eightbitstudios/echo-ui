angular.module('echo.directives.onFileChange', [
  'echo.models.file'
]).directive('onFileChange', function($parse, FileModel) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      var onFileChange = $parse(attrs.onFileChange);

      element.on('change', function() {
        if (onFileChange) {
          onFileChange(scope, {
            file: new FileModel(_.get(element[0].files, '0'))
          });
          scope.$apply();
          element.val('');
        }
      });
    }
  };
});