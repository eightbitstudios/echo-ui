angular.module('echo.index.carrier.invoicing.activeInvoices', [
  'echo.index.carrier.invoicing.invoiceTable',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.api.invoices',
  'echo.action',
  'echo.actions.creators.invoiceCounts'
])
  .component('activeInvoices', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/components/active-invoices/active-invoices.template.html',
    bindings: {},
    controller: function (PagingModel, appConstants, invoicesApi, store$, invoiceCountsActionCreator, routesConfig) {
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
            var action = invoiceCountsActionCreator.setInvoiceCounts(invoicesPageData.invoicesCount);
            store$.dispatch(action);
          }
        }).finally(function () {
          that.showLoading = false;
        });
      };

      this.$onInit = function() {
        var state = store$.getState();
        this.carrierId = state.carrier.carrierId;
        this.repDetails = state.rep;

        this.unbilledLoads = routesConfig.INDEX.unbilledLoads.name;
        this.paging = new PagingModel(appConstants.LIMIT.invoicesList);
        this.fetchActiveInvoices();
      };
    }
  });
