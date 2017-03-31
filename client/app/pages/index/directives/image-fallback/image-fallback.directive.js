angular.module('echo.directives.imageFallback', [
]).directive('imageFallback', function () {
   return {
    link: function postLink(scope, element, attrs) {
      element.bind('error', function() {
        element.attr('src', attrs.imageFallback);
      });
    }
   };
});