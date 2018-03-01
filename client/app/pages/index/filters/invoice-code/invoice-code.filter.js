angular.module('echo.filters.invoiceCode', [
  'echo.config.globals',
  'echo.constants.invoices'
])
  .filter('invoiceCode', function (invoiceConstants) {
    return function(code) {
      var enumObject = _.find(invoiceConstants.STATUSES, function(obj) { return obj.value === code; });
      return _.get(enumObject, 'description', null);
    };
  });
