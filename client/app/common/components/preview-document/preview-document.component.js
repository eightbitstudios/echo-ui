angular.module('echo.components.previewDocument', [
  'echo.directives.renderPdf'
]).component('previewDocument', {
  bindings: {
    document: '<'
  },
  templateUrl: 'app/common/components/preview-document/preview-document.template.html',
  controller: function() {
    var that = this;

    that.$onInit = function() {
      if (that.document.isPDF()) {
        that.data = that.document.getPDF();
      } else {
        that.document.getImage().then(function(image) {
          that.data = image;
        });
      }
    };
  }
});