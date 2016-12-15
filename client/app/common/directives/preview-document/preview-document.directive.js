angular.module('echo.directives.previewDocument', [
    'echo.config.globals'
  ])
  .directive('previewDocument', function(PDFJS) {
    return {
      restrict: 'A',
      scope: {
        previewDocument: '='
      },
      link: function(scope, element) {
        var fileReader = new FileReader();
        if (scope.previewDocument.isPDF()) {
          fileReader.onload = function() {
            PDFJS.getDocument(fileReader.result).then(function(pdf) {
              pdf.getPage(1).then(function(page) {
                var scale = 1.5;
                var viewport = page.getViewport(scale);

                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                var task = page.render({
                  canvasContext: context,
                  viewport: viewport
                });

                task.then(function() {
                  element.append(canvas);
                });
              });
            });
          };
          fileReader.readAsArrayBuffer(scope.previewDocument.fileData);
        } else {
          fileReader.readAsDataURL(scope.previewDocument.fileData);
          fileReader.onload = function() {
            var img = document.createElement('img');
            img.src = fileReader.result;
            element.append(img);
          };
        }
      }
    };
  });