angular.module('echo.components.modal.documentUpload', [
    'echo.components.radioButton',
    'echo.constants.documentTypes',
    'echo.components.loadingButton',
    'echo.api.document',
    'echo.components.modal.documentUpload.documentUploadSidebar',
    'echo.components.modal.documentUpload.documentType',
    'echo.components.modal.modalHeader',
    'echo.components.modal.documentUpload.uploadedDocuments',
    'echo.components.fadingText'
  ])
  .component('documentUploadModal', {
    templateUrl: 'app/common/components/modal/document-upload-modal/document-upload-modal.template.html',
    bindings: {
      load: '=',
      modalActions: '<',
      documents: '<',
      selectedDocumentType: '<',
      originalBillRate: '<'
    },
    controller: function(documentTypes, documentApi) {
      var that = this;

      that.uploadDocuments = function() {
        that.showLoading = true;
        that.showSavedMessage = false;
        that.showErrorMessage = false;

        documentApi.createDocuments(that.load.loadNumber, that.selectedDocumentType, that.files)
          .then(function() {
            that.showSavedMessage = true;
            that.refreshDocuments();
          }).catch(function(message) {
            that.showErrorMessage = true;
            that.serverError = message;
          }).finally(function() {
            that.showLoading = false;
            that.files = [];
          });
      };

      that.refreshDocuments = function() {
        documentApi.fetchDocuments(that.load.loadGuid).then(function(documents) {
          that.documents = documents;
        });
      };

      that.$onInit = function() {
        that.files = [];
        that.documentTypes = documentTypes;
        that.invoiceDate = new Date();
        that.newBillRate = '';
        that.invoiceNumber = '';
        that.numberOfStops = _.max([_.size(that.load.pickUp), _.size(that.load.delivery)]);
      };
    }
  });