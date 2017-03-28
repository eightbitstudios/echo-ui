angular.module('echo.index.carrier.invoicing.archivedInvoices', [
    'echo.index.carrier.invoicing.invoiceTable',
    'echo.index.carrier.invoicing.invoicesFilter',
    'echo.models.paging',
    'echo.constants.invoices',
    'echo.config.appConstants',
    'echo.config.routes',
    'echo.api.invoices',
    'echo.actions',
    'echo.index.actionsCreators.invoiceCounts'
  ])
  .component('archivedInvoices', {
    templateUrl: 'archived-invoices.component.html',
    bindings: {},
    controller: function(PagingModel, appConstants, invoicesApi, store$,
      invoiceCountsActionCreator, routesConfig, invoiceConstants) {
      var that = this;

      that.fetchArchivedInvoices = function() {
        that.showLoading = true;

        invoicesApi.fetchArchivedInvoices(that.carrierId, that.paging)
          .then(function(invoicesPageData) {
            if (invoicesPageData.invoices) {
              that.archivedInvoices = invoicesPageData.invoices;
              that.paging.recordCount = _.size(invoicesPageData.invoices);
            }
          }).finally(function() {
            that.showLoading = false;
          });
      };

      that.changePage = function() {
        that.archivedInvoices = null;
        that.fetchArchivedInvoices();
      };

      that.$onInit = function() {
        var state = store$.getState();
        that.carrierId = state.carrier.carrierId;
        that.repDetails = state.rep;
        that.filterText = that.defaultFilterText;
        that.statusEnums = invoiceConstants.STATUSES;

        that.unbilledLoadsRoute = routesConfig.INDEX.unbilledLoads.name;
        that.paging = new PagingModel(appConstants.LIMIT.invoicesList);
        that.paging.totalRecords = state.invoiceCounts.activeInvoices;
        that.unbilledLoads = state.invoiceCounts.unbilledLoads;

        that.fetchArchivedInvoices();
      };
    }
  });