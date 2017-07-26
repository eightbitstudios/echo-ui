angular.module('echo.index.carrier.invoicing.invoicesFilter', [
  'echo.components.filterButton',
  'echo.services.modal',
  'echo.index.carrier.invoicing.invoicesFilter.invoicesHelpModal'
]).component('invoicesFilter', {
  templateUrl: 'invoices-filter.component.html',
  bindings: {
    filterText: '<',
    invoiceCount: '<'
  },
  transclude: true,
  controller: function(modalService) {
    var that = this;

    that.openHelpModal = function() {
      modalService.open({
        component: 'invoices-help-modal',
        bindings: {}
      });
    };
  }
});