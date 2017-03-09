'use strict';

angular.module('echo.components.invoiceAccordion.paidInvoices', []).component('paidInvoices', {
  bindings: {},
  templateUrl: 'paid-invoices.component.html',
  controller: function() {
    var that = this;

    that.$onInit = function() {
      that.paidInvoices = [{
        paidDate: 'JUN 26 2016',
        checkNumber: '6572989',
        checkDate: 'JUN 20 2016',
        amount: 1000.00
      },{
        paidDate: 'JUN 29 2016',
        checkNumber: '6512389',
        checkDate: 'JUN 29 2016',
        amount: 850.00
      }];
    };
  }
});