angular.module('echo.filters.invoiceDate', [])
  .filter('invoiceDate', function () {
    return function(date) {
      return _.upperCase(moment(date || undefined, 'MM/DD/YYYY HH:mm:ss').format('MMM DD YYYY'));
    };
  });
