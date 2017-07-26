angular.module('echo.directives.dragEnter', [])
  .directive('dragEnter', function($parse) {
    return {
      restrict: 'A',
      scope: false,
      link: function(scope, element, attrs) {
        var dragEnter = $parse(attrs.dragEnter);

        element.on('dragover dragenter', function() {
          if(dragEnter){
            dragEnter(scope);
            scope.$apply();
          }
        });
      }
    };
  });