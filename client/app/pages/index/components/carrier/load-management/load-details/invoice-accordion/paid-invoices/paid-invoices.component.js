'use strict';

angular.module('echo.components.invoiceAccordion.paidInvoices', [])
  .component('paidInvoices', {
    bindings: {
      paidInvoices: '<'
    },
    templateUrl: 'paid-invoices.component.html'
  });