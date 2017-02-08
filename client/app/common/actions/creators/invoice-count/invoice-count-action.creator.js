angular.module('echo.actions.creators.invoiceCounts', [
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
    }
  };
});
