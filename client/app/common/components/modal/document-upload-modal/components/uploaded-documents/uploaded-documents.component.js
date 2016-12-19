angular.module('echo.components.modal.documentUpload.uploadedDocuments', [
  'echo.components.fileUpload',
  'echo.filters.pages',
  'echo.config.appConstants',
  'echo.components.fadingText',
  'echo.components.previewDocument'
])
  .component('uploadedDocuments', {
    templateUrl: 'app/common/components/modal/document-upload-modal/components/uploaded-documents/uploaded-documents.template.html',
    bindings: {
      files: '='
    },
    controller: function (appConstants) {
      var that = this;

      that.uploadConstraints = appConstants.FILE_UPLOAD.DOCUMENTS;

      that.removeFile = function(file){
        _.remove(that.files, file);
      };
    }
  });