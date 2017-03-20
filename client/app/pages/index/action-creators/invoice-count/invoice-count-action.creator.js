angular.module('echo.index.actionsCreators.invoiceCounts', [
  'echo.action',
  'echo.api.invoices'
]).factory('invoiceCountsActionCreator', function(Rx, invoiceCountsActions, invoicesApi) {
  return {
    fetchInvoiceCounts: function(carrierId) {
      var that = this;
      return {
        type: invoiceCountsActions.FETCH_INVOICE_COUNTS,
        payload: Rx.Observable.fromPromise(invoicesApi.fetchInvoiceCount(carrierId))
          .flatMap(that.setInvoiceCounts)
      };
    },
    setInvoiceCounts: function(invoiceCounts) {
      return {
        type: invoiceCountsActions.INVOICE_COUNTS_LOADED,
        payload: invoiceCounts
      };
    },
    clearInvoiceCounts: function() {
      return {
        type: invoiceCountsActions.CLEAR_INVOICE_COUNTS
      };
    }
  };
});
