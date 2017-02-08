angular.module('echo.index.carrier.invoicing.invoiceTable', [
  'echo.filters.formatCityState',
  'echo.enums.invoices'
])
  .component('invoiceTable', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/components/invoice-table/invoice-table.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<',
      invoices: '<',
      showLoading: '<'
    },
    controller: function (invoiceEnums, routesConfig) {
      this.mapInvoiceCode = function (invoiceCode) {
        var enumObject = _.find(invoiceEnums.STATUSES, function(obj) { return obj.value === invoiceCode; });
        return _.get(enumObject, 'description', null);
      };

      this.mapReasonCode = function (reasonCode) {
        var enumObject = _.find(invoiceEnums.STATUS_REASONS, function(obj) { return obj.value === reasonCode; });
        return _.get(enumObject, 'description', null);
      };

      this.$onInit = function () {
        this.loadDetails = routesConfig.INDEX.loadDetails.name;
      };
    }
  });
