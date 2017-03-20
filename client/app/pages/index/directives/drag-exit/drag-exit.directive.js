angular.module('echo.directives.dragExit', [])
  .directive('dragExit', function($parse) {
    return {
      restrict: 'A',
      scope: false,
      link: function(scope, element, attrs) {
        var dragExit = $parse(attrs.dragExit);

        element.on('dragleave dragend drop', function() {
          if(dragExit) {
            dragExit(scope);
            scope.$apply();
          }
        });
      }
    };
  });