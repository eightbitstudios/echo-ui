angular.module('echo.directives.fixedInContainer', [])
  .directive('fixedInContainer', function($document) {
    return {
      restrict: 'A',
      scope: {
        fixedInContainer: '='
      },
      link: function(scope, element) {

        var offset = function offset(elt) {
          var rect = elt.getBoundingClientRect(),
            bodyElt = $document[0].body;

          return {
            top: rect.top + bodyElt.scrollTop,
            left: rect.left + bodyElt.scrollLeft
          };
        };

        var parentPosition = offset(element.parent()[0]);

        var calculateLoadingPosition = function() {
          if (parentPosition.top <= $document[0].body.scrollTop) {
            element.css('top', ($document[0].body.scrollTop - parentPosition.top) + 20 + 'px');
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