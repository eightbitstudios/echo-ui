'use strict';

angular.module('echo.components.invoiceAccordion.invoiceActivity', []).component('invoiceActivity', {
  bindings: {},
  templateUrl: 'invoice-activity.component.html',
  controller: function() {
    var that = this;

    that.$onInit = function() {
      that.invoiceActivities = [{
        activity: 'Line Haul',
        quantity: 1,
        rate: 1200.50,
        amount: 1200.00
      }, {
        activity: 'Fuel Surcharge',
        quantity: 1,
        rate: 1200.50,
        amount: 1200.00
      }];
      
      that.invoiceActivityAmount = {
        total: 1850.00,
        paid: 1850.00,
        due: 0
      };
    };
  }
});