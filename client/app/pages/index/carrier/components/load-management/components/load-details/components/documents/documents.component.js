angular.module('echo.index.carrier.loadManagement.loadDetails.documents', [
    'echo.components.modal.documentOverview.loadDocuments',
    'echo.services.modal',
    'echo.components.modal.documentOverview',
    'echo.components.modal.documentUpload',
    'echo.constants.documentTypes'
  ])
  .component('documents', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/documents/documents.template.html',
    bindings: {
      load: '<',
      documents: '<'
    },
    controller: function(modalService, documentTypes) {
      var that = this;

      that.openDocumentUploadModal = function(documentType) {
        return modalService.open({
          component: 'document-upload-modal',
          bindings: {
            load: that.load,
            documents: that.documents,
            selectedDocumentType: documentType || documentTypes.POD.value,
            originalBillRate: '$1,300'
          }
        });
      };

      that.openInvoiceDocumentUploadModal = function() {
        that.openDocumentUploadModal(documentTypes.INVOICE.value);
      };
 
      that.openDocumentOverviewModal = function(selectedDocument) {
        return modalService.open({
          component: 'document-overview-modal',
          windowTopClass: 'transparent',
          openedClass: 'dark modal-open',
          bindings: {
            documents: that.documents,
            selectedDocument: selectedDocument
          }
        });
      };
    }
  });
