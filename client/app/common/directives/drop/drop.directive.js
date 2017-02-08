angular.module('echo.directives.drop', [
  'echo.models.file'
]).directive('drop', function($parse, FileModel) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      var drop = $parse(attrs.drop);

      element.on('drag dragstart dragend dragover dragenter dragleave drop', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });

      element.on('drop', function(event) {
        if (drop) {
            drop(scope, {
              file: new FileModel(_.get(event.dataTransfer.files, '0'))
            });
          scope.$apply();
        }
      });
    }
  };
});