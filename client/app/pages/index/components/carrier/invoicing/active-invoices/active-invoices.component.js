angular.module('echo.index.carrier.invoicing.activeInvoices', [
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
  .component('activeInvoices', {
    templateUrl: 'active-invoices.component.html',
    bindings: {},
    controller: function(PagingModel, appConstants, invoicesApi, store$,
      invoiceCountsActionCreator, routesConfig, invoiceConstants) {
      var that = this;

      that.filterHandler = function(value, enumValue) {
        var statusEnum = _.find(invoiceConstants.STATUSES, function(status) {
          return status.value === enumValue;
        });
        if (!value || !statusEnum) {
          that.filterText = that.defaultFilterText;
          delete that.filterBy;
        } else {
          that.filterText = 'By ' + statusEnum.description;
          that.filterBy = enumValue;
        }
        that.paging.reset();
        that.fetchActiveInvoices();
      };

      that.fetchActiveInvoices = function() {
        that.showLoading = true;

        invoicesApi.fetchActiveInvoices(that.carrierId, that.paging, that.filterBy)
          .then(function(invoicesPageData) {
            if (invoicesPageData.invoices) {
              that.activeInvoices = invoicesPageData.invoices;
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

      that.$onInit = function() {
        var state = store$.getState();
        that.carrierId = state.carrier.carrierId;
        that.repDetails = state.rep;
        that.defaultFilterText = 'By Received Date';
        that.filterText = that.defaultFilterText;
        that.statusEnums = invoiceConstants.STATUSES;

        that.unbilledLoadsRoute = routesConfig.INDEX.unbilledLoads.name;
        that.paging = new PagingModel(appConstants.LIMIT.invoicesList);
        that.fetchActiveInvoices();
      };
    }
  });