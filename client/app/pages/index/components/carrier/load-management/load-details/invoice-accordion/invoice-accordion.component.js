'use strict';

angular.module('echo.components.invoiceAccordion', [
  'echo.components.invoiceAccordion.paidInvoices'
]).component('invoiceAccordion', {
  bindings: {
    invoiceDetails: '<'
  },
  templateUrl: 'invoice-accordion.component.html',
  controller: function() {
    var that = this;

    that.$onInit = function() {
      that.isOpen = true;
    };
  }
});