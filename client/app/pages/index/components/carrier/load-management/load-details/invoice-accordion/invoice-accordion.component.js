'use strict';

angular.module('echo.components.invoiceAccordion', [
]).component('invoiceAccordion', {
  bindings: {
  },
  templateUrl: 'invoice-accordion.component.html',
  controller: function() {
    this.$onInit = function() {
      this.isOpen = true;
    };
  }
});