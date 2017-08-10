angular.module('echo.components.modal.documentUpload.invoices', [
  'echo.constants.documentTypeConstants',
  'echo.api.document',
  'echo.directives.currency'
]).component('invoices', {
  templateUrl: 'invoices.component.html',
  bindings: {
    loadId: '<',
    files: '<',
    originalBillRate: '<',
    refreshDocumentsCallback: '&'
  },
  controller: function(store$, documentApi) {
    var that = this;

    that.openDatePicker = function() {
      that.isOpen = true;
    };

    that.uploadDocuments = function() {
      that.showLoading = true;
      that.showSavedMessage = false;
      that.showErrorMessage = false;

      documentApi.createInvoices(that.carrierId, that.loadId, that.files, 
        that.invoiceNumber, that.newBillRate, that.invoiceDate)
        .then(function() {
          that.showSavedMessage = true;
          that.refreshDocumentsCallback();
        }).catch(function(serverError) {
          that.showErrorMessage = true;
          that.serverError = serverError.code;
        }).finally(function() {
          that.showLoading = false;
        });
    };

    that.$onInit = function() {
      that.isOpen = false;

      that.dateOptions = {
        showWeeks: false,
        initDate: new Date()
      };
        
      that.carrierId = store$.getState().carrier.carrierId;
      that.invoiceDate = new Date();
      that.newBillRate = '';
      that.invoiceNumber = '';
    };
  }
});