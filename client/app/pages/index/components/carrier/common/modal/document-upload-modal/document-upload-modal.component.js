angular.module('echo.components.modal.documentUpload', [
  'echo.components.radioButton',
  'echo.constants.documentTypeConstants',
  'echo.components.loadingButton',
  'echo.components.modal.documentUpload.documentUploadSidebar',
  'echo.components.modal.documentUpload.documentType',
  'echo.components.modal.modalHeader',
  'echo.components.modal.documentUpload.uploadedDocuments',
  'echo.components.modal.documentUpload.invoices',
  'echo.components.modal.documentUpload.loadDocumentTypes'
])
  .component('documentUploadModal', {
    templateUrl: 'document-upload-modal.component.html',
    bindings: {
      load: '=',
      modalActions: '<',
      documents: '<',
      selectedDocumentType: '<',
      originalBillRate: '<'
    },
    controller: function (store$, documentTypeConstants, documentApi) {
      var that = this;

      that.refreshDocuments = function () {
        documentApi.fetchDocuments(that.carrierId, that.load.loadGuid).then(function (documents) {
          that.documents = documents;
          that.updateDocumentNeeds();
        });
        that.resetModal();
      };

      that.resetModal = function () {
        that.selectedDocumentType = documentTypeConstants.POD.value;
        that.files = [];
      };

      that.updateDocumentNeeds = function () {

        that.load.needsInvoice = !_.includes(_.map(that.documents, function (document) {
          return document.documentSubType;
        }), _.toString(documentTypeConstants.INVOICE.value));

        that.numberOfPODs = _(that.documents).filter(function (document) {
          return document.documentSubType === _.toString(documentTypeConstants.POD.value);
        }).size();

        that.load.neededPODs = Math.max(that.numberOfStops - that.numberOfPODs, 0);
      };

      that.$onInit = function () {
        that.files = [];
        that.originalBillRate = _.get(that.load, 'invoiceAmount');
        that.carrierId = store$.getState().carrier.carrierId;
        that.documentTypeConstants = documentTypeConstants;
        that.selectedDocumentType = that.selectedDocumentType || documentTypeConstants.POD.value;
        that.numberOfStops = _.max([_.size(that.load.pickUp), _.size(that.load.delivery)]);
      };
    }
  });