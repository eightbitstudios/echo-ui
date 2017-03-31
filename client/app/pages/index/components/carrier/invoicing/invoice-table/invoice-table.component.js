angular.module('echo.index.carrier.invoicing.invoiceTable', [
    'echo.filters.formatCityState',
    'echo.filters.invoiceCode',
    'echo.filters.invoiceReasonCode',
    'echo.config.routes',
    'echo.index.carrier.invoicing.invoiceTable.invoiceNumber'
  ])
  .component('invoiceTable', {
    templateUrl: 'invoice-table.component.html',
    bindings: {
      repDetails: '<',
      carrierId: '<',
      invoices: '<',
      showLoading: '<'
    },
    controller: function($state, routesConfig) {
      var that = this;

      that.$onInit = function() {
        that.loadDetailsRoute = routesConfig.INDEX.loadDetails.name;
        that.currentRoute = $state.$current.name;
      };
    }
  });