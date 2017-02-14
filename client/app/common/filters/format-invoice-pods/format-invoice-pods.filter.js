angular.module('echo.filters.formatInvoicePODs', [
  'echo.config.globals'
])
  .filter('formatInvoicePODs', function () {
    return function(load) {
      if (!load) {
        return '';
      }

      var invoiceRequired = _.get(load, 'invoiceRequired');
      var podsRequired = _.get(load, 'podsRequired');
      var isMultiStop = _.size(load.pickUp) > 1 || _.size(load.delivery) > 1;

      if (!_.isBoolean(invoiceRequired)) {
        invoiceRequired = false;
      }

      if (!_.isInteger(podsRequired)) {
        podsRequired = 0;
      }

      if (!invoiceRequired) {
        switch (podsRequired) {
          case 0:
            return '';
          case 1:
            return isMultiStop ? 'Need 1 POD' : 'Need POD';
          default:
            return 'Need ' + podsRequired + ' PODs';
        }
      } else {
        switch (podsRequired) {
          case 0:
            return 'Need Invoice';
          case 1:
            return isMultiStop ? 'Need 1 POD and Invoice' : 'Need POD and Invoice';
          default:
            return 'Need ' + podsRequired + ' PODs and Invoice';
        }
      }
    };
  });
