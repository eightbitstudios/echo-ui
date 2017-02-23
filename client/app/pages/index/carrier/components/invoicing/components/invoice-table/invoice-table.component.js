angular.module('echo.index.carrier.invoicing.invoiceTable', [
  'echo.filters.formatCityState',
  'echo.filters.invoiceCode',
  'echo.filters.invoiceReasonCode'
])
  .component('invoiceTable', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/components/invoice-table/invoice-table.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<',
      invoices: '<',
      showLoading: '<'
    },
    controller: function (routesConfig) {
      var that = this;

      that.$onInit = function () {
        that.loadDetailsRoute = routesConfig.INDEX.loadDetails.name;
      };
    }
  });
