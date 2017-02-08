angular.module('echo.index.carrier.invoicing.activeInvoices', [
  'echo.index.carrier.invoicing.invoiceTable',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.api.invoices',
  'echo.services.invoicingCount'
])
  .component('activeInvoices', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/components/active-invoices/active-invoices.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function (PagingModel, appConstants, invoicesApi, invoicingCountService, routesConfig) {
      this.fetchActiveInvoices = function () {
        var that = this;
        that.showLoading = true;

        invoicesApi.fetchActiveInvoices(that.carrierId, that.paging).then(function(invoicesPageData) {
          if (invoicesPageData.invoices) {
            that.activeInvoices = invoicesPageData.invoices;
            that.paging.recordCount = _.size(invoicesPageData.invoices);
          }

          if (invoicesPageData.invoicesCount) {
            that.paging.totalRecords = invoicesPageData.invoicesCount.activeInvoices;
            that.unbilledInvoices = invoicesPageData.invoicesCount.unbilledInvoices;
            that.unbilledValue = invoicesPageData.invoicesCount.unbilledValue;
            invoicingCountService.setInvoiceCount(invoicesPageData.invoicesCount);
          }
        }).finally(function () {
          that.showLoading = false;
        });
      };

      this.$onInit = function() {
        this.unbilledLoads = routesConfig.INDEX.unbilledLoads.name;
        this.paging = new PagingModel(appConstants.LIMIT.invoicesList);
        this.fetchActiveInvoices();
      };
    }
  });
