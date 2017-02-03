angular.module('echo.index.carrier.invoicing.activeInvoices', [
  'echo.index.carrier.invoicing.invoiceTable',
  'echo.models.paging',
  'echo.config.appConstants'
])
  .component('activeInvoices', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/components/active-invoices/active-invoices.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function (PagingModel, appConstants) {
      this.$onInit = function() {
        this.showLoading = false;
        this.paging = new PagingModel(appConstants.LIMIT.invoicesList);
        this.activeInvoices = [{},{},{},{},{},{},{},{},{},{}];
        this.paging.totalRecords = 12;
        this.paging.recordCount = 10;
      };
    }
  });
