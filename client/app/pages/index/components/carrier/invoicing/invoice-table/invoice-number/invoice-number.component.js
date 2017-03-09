angular.module('echo.index.carrier.invoicing.invoiceTable.invoiceNumber', [
    'echo.components.modal.documentOverview',
    'echo.services.modal',
    'echo.api.document',
    'echo.constants.documentTypeConstants',
    'echo.components.loading'
  ])
  .component('invoiceNumber', {
    templateUrl: 'invoice-number.component.html',
    bindings: {
      carrierId: '<',
      invoice: '<'
    },
    controller: function($state, modalService, documentApi, documentTypeConstants) {
      var that = this;

      that.showInvoicePreview = function(loadGuid) {
        that.showLoading = true;
        documentApi.fetchDocuments(that.carrierId, loadGuid).then(function(documents) {
          modalService.open({
            component: 'document-overview-modal',
            windowTopClass: 'transparent',
            openedClass: 'dark modal-open',
            bindings: {
              documents: documents,
              selectedDocument: _.find(documents, {documentSubType: documentTypeConstants.INVOICE.value})
            }
          });
        }).finally(function() {
          that.showLoading = false;
        });
      };
    }
  });