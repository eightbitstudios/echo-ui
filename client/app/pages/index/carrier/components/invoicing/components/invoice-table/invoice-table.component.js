angular.module('echo.index.carrier.invoicing.invoiceTable', [])
  .component('invoiceTable', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/components/invoice-table/invoice-table.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<',
      invoices: '<'
    },
    controller: function () {}
  });
