'use strict';

angular.module('echo.components.invoiceAccordion.paidInvoices', [
  'echo.filters.invoiceDate'
]).component('paidInvoices', {
  bindings: {
    paidInvoices: '<'
  },
  templateUrl: 'paid-invoices.component.html'
});