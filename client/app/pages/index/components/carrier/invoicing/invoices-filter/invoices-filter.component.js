angular.module('echo.index.carrier.invoicing.invoicesFilter', [
  'echo.components.filterButton'
]).component('invoicesFilter', {
  templateUrl: 'invoices-filter.component.html',
  bindings: {
    filterText: '<',
    invoiceCount: '<'
  },
  transclude: true
});
