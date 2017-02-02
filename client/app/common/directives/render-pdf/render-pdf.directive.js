angular.module('echo.directives.renderPdf', [])
  .directive('renderPdf', function() {
    return {
      restrict: 'A',
      scope: {
        renderPdf: '=',
        error: '&'
      },
      link: function(scope, element) {

        if (scope.renderPdf.isPDF()) {
          scope.renderPdf.getPDF().then(function(pdf) {
            var scale = 1.5;
            var viewport = pdf.getViewport(scale);
            var canvas = element[0];
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var task = pdf.render({
              canvasContext: context,
              viewport: viewport
            });

            task.then(function() {
              element.append(canvas);
            });

          }).catch(function() {
            scope.error();
          });
        }
      }
    };
  });