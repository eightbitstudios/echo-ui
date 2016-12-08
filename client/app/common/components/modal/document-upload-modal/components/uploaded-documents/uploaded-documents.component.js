angular.module('echo.components.modal.documentUpload.uploadedDocuments', [
  'echo.directives.fileUpload',
  'echo.filters.pages',
  'echo.directives.previewDocument',
  'echo.config.appConstants'
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