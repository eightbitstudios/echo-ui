angular.module('echo.components.modal.documentUpload', [
    'echo.components.radioButton',
    'echo.constants.documentTypes',
    'echo.components.loadingButton',
    'echo.api.document',
    'echo.components.modal.documentUpload.documentUploadSidebar',
    'echo.components.modal.documentUpload.documentType',
    'echo.components.modal.modalHeader',
    'echo.components.modal.documentUpload.uploadedDocuments',
    'echo.components.successfulText'
  ])
  .component('documentUploadModal', {
    templateUrl: 'app/common/components/modal/document-upload-modal/document-upload-modal.template.html',
    bindings: {
      load: '=',
      modalActions: '<',
      documents: '<'
    },
    controller: function(documentTypes, documentApi) {
      var that = this;

      that.files = [];
      that.selectedDocumentType = documentTypes.POD;

      that.uploadDocuments = function() {
        that.showLoading = true;
        that.showSavedMessage = false;
        that.showErrorMessage = false;

        documentApi.createDocuments(that.load.loadNumber, that.selectedDocumentType, that.files)
          .then(function() {
            that.showSavedMessage = true;
          }).catch(function(message) {
            that.showErrorMessage = true;
            that.serverError = message;
          }).finally(function() {
            that.showLoading = false;
            that.files = [];
          });
      };
    }
  });