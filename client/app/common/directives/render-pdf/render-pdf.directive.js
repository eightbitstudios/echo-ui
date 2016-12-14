angular.module('echo.directives.renderPdf', [])
  .directive('renderPdf', function() {
    return {
      restrict: 'A',
      scope: {
        renderPdf: '='
      },
      link: function(scope, element) {
        scope.renderPdf.then(function(pdf) {
          var scale = 1.5;
          var viewport = pdf.getViewport(scale);
          var context = element[0].getContext('2d');
          element.height = viewport.height;
          element.width = viewport.width;

          pdf.render({
            canvasContext: context,
            viewport: viewport
          });
        });
      }
    };
  });