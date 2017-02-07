angular.module('echo.components.modal.documentUpload', [
    'echo.components.radioButton',
    'echo.constants.documentTypes',
    'echo.components.loadingButton',
    'echo.components.modal.documentUpload.documentUploadSidebar',
    'echo.components.modal.documentUpload.documentType',
    'echo.components.modal.modalHeader',
    'echo.components.modal.documentUpload.uploadedDocuments',
    'echo.components.fadingText',
    'echo.components.modal.documentUpload.invoices',
    'echo.components.modal.documentUpload.loadDocumentTypes'
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

      that.refreshDocuments = function() {
        documentApi.fetchDocuments(that.load.loadGuid).then(function(documents) {
          that.documents = documents;
        });
        that.resetModal();
      };

      that.resetModal = function() {
        that.selectedDocumentType = documentTypes.POD.value;
        that.files = [];
      };

      that.$onInit = function() {
        that.files = [];
        that.documentTypes = documentTypes;
        that.selectedDocumentType = that.selectedDocumentType || documentTypes.POD.value;
        that.numberOfStops = _.max([_.size(that.load.pickUp), _.size(that.load.delivery)]);
      };
    }
  });