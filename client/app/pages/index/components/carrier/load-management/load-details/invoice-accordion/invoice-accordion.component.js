'use strict';

angular.module('echo.components.invoiceAccordion', [
  'echo.components.invoiceAccordion.invoiceActivity',
  'echo.components.invoiceAccordion.paidInvoices'
]).component('invoiceAccordion', {
  bindings: {},
  templateUrl: 'invoice-accordion.component.html',
  controller: function() {
    this.$onInit = function() {
      this.isOpen = true;
    };
  }
});