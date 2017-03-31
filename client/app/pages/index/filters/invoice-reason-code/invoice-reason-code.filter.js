angular.module('echo.filters.invoiceReasonCode', [
  'echo.config.globals',
  'echo.constants.invoices'
])
  .filter('invoiceReasonCode', function (invoiceConstants) {
    return function(code) {
      var enumObject = _.find(invoiceConstants.STATUS_REASONS, function(obj) { return obj.value === code; });
      return _.get(enumObject, 'description', null);
    };
  });
