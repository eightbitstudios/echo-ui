angular.module('echo.reducers.invoiceCount', [
  'echo.actions',
  'echo.api.invoices'
])
  .factory('invoiceCountReducer', function(invoiceCountsActions) {
    var reducer = function(state, action) {
      switch (action.type) {
        case invoiceCountsActions.INVOICE_COUNTS_LOADED:
          return action.payload;
        case invoiceCountsActions.CLEAR_INVOICE_COUNTS:
          return {};
        default:
          return state;
      }
    };
    return reducer;
  });
