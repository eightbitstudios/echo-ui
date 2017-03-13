angular.module('echo.index.carrier.invoicing.archivedInvoices', [
    'echo.index.carrier.invoicing.invoiceTable',
    'echo.index.carrier.invoicing.invoicesFilter',
    'echo.models.paging',
    'echo.constants.invoices',
    'echo.config.appConstants',
    'echo.config.routes',
    'echo.api.invoices',
    'echo.action',
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

            if (invoicesPageData.invoicesCount) {
              that.paging.totalRecords = invoicesPageData.invoicesCount.activeInvoices;
              that.unbilledLoads = invoicesPageData.invoicesCount.unbilledLoads;
              that.unbilledAmount = invoicesPageData.invoicesCount.unbilledAmount;
              that.totalActiveInvoiceAmount = invoicesPageData.invoicesCount.totalActiveInvoiceAmount;

              var state = store$.getState();
              if (_.isEmpty(state.invoiceCounts)) {
                var action = invoiceCountsActionCreator.setInvoiceCounts(invoicesPageData.invoicesCount);
                store$.dispatch(action);
              }
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
        that.fetchArchivedInvoices();
      };
    }
  });