angular.module('echo.components.modal.documentUpload.uploadedDocuments', [
    'echo.components.fileUpload',
    'echo.filters.pages',
    'echo.config.appConstants',
    'echo.components.previewDocument'
  ])
  .component('uploadedDocuments', {
    templateUrl: 'app/common/components/modal/document-upload-modal/components/uploaded-documents/uploaded-documents.component.html',
    bindings: {
      files: '='
    },
    controller: function(appConstants) {
      var that = this;

      that.removeFile = function(file) {
        _.remove(that.files, file);
      };

      that.$onInit = function() {
        that.uploadConstraints = appConstants.FILE_UPLOAD.DOCUMENTS;
      };
    }
  });