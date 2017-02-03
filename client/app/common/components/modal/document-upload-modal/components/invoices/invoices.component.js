angular.module('echo.components.modal.documentUpload.invoices', [
  'echo.constants.documentTypes'
]).component('invoices', {
  templateUrl: 'app/common/components/modal/document-upload-modal/components/invoices/invoices.template.html',
  bindings: {
    invoiceDate: '=',
    originalBillRate: '<',
    newBillRate: '=',
    invoiceNumber: '='
  },
  controller: function() {
    var that = this;

    that.openDatePicker = function() {
      that.isOpen = true;
    };

    that.$onInit = function() {
      that.isOpen = false;

      that.dateOptions = {
        showWeeks: false,
        initDate: new Date()
      };
      that.invoiceDate = new Date();
      that.newBillRate = '';
      that.invoiceNumber = '';
    };
  }
});