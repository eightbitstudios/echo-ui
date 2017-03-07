angular.module('echo.components.previewDocument', [
  'echo.directives.renderPdf',
  'echo.config.assetConfig'
]).component('previewDocument', {
  bindings: {
    document: '<'
  },
  templateUrl: 'preview-document.component.html',
  controller: function(assetConfig) {
    var that = this;

    that.pdfError = false;

    that.renderPdfError = function() {
      that.pdfError = true;
    };

    that.$onInit = function() {
      if (that.document.isPDF()) {
        that.imageData = assetConfig.PDF_FALLBACK;
      } else {
        if(that.document.isPNG()){
          that.imageFallback = assetConfig.PNG_FALLBACK;
        } else if(that.document.isJPG()) {
          that.imageFallback = assetConfig.JPG_FALLBACK;
        }
        that.document.getImage().then(function(image) {
          that.imageData = image;
        });
      }
    };
  }
});