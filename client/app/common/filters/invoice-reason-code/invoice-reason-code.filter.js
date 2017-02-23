angular.module('echo.filters.invoiceReasonCode', [
  'echo.config.globals',
  'echo.enums.invoices'
])
  .filter('invoiceReasonCode', function (invoiceEnums) {
    return function(code) {
      var enumObject = _.find(invoiceEnums.STATUS_REASONS, function(obj) { return obj.value === code; });
      return _.get(enumObject, 'description', null);
    };
  });
