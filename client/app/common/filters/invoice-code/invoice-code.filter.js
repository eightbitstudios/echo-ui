angular.module('echo.filters.invoiceCode', [
  'echo.config.globals',
  'echo.enums.invoices'
])
  .filter('invoiceCode', function (invoiceEnums) {
    return function(code) {
      var enumObject = _.find(invoiceEnums.STATUSES, function(obj) { return obj.value === code; });
      return _.get(enumObject, 'description', null);
    };
  });
