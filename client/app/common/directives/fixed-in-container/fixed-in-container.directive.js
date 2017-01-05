angular.module('echo.directives.fixedInContainer', [])
  .directive('fixedInContainer', function($document) {
    return {
      restrict: 'A',
      scope: {
        fixedInContainer: '='
      },
      link: function(scope, element) {
        var parentPosition = element.parent().offset();

        var calculateLoadingPosition = function() {
          if (parentPosition.top <= $document[0].body.scrollTop) {
            element.css({
              top: ($document[0].body.scrollTop - parentPosition.top) + 20
            });
          }
        };

        if (scope.fixedInContainer) {
          $document.on('scroll', function() {
            calculateLoadingPosition();
          });
          calculateLoadingPosition();
        }
      }
    };
  });