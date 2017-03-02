angular.module('echo.index.carrier.invoicing.invoicesFilter', [
  'echo.components.filterButton'
]).component('invoicesFilter', {
  templateUrl: 'app/pages/index/carrier/components/invoicing/components/invoices-filter/invoices-filter.component.html',
  bindings: {
    filterText: '<',
    invoiceCount: '<'
  },
  transclude: true
});
