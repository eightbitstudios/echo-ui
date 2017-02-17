angular.module('echo.index.carrier.invoicing.activeInvoices', [
  'echo.index.carrier.invoicing.invoiceTable',
  'echo.index.carrier.invoicing.invoicesFilter',
  'echo.models.paging',
  'echo.enums.invoices',
  'echo.config.appConstants',
  'echo.api.invoices',
  'echo.action',
  'echo.actions.creators.invoiceCounts'
])
  .component('activeInvoices', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/components/active-invoices/active-invoices.template.html',
    bindings: {},
    controller: function (PagingModel, appConstants, invoicesApi, store$, invoiceCountsActionCreator, routesConfig, invoiceEnums) {
      var that = this;

      that.filterHandler = function(value, enumValue) {
        var statusEnum = _.find(invoiceEnums.STATUSES, function(status) { return status.value === enumValue; });
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

      that.fetchActiveInvoices = function () {
        var that = this;
        that.showLoading = true;

        invoicesApi.fetchActiveInvoices(that.carrierId, that.paging, that.filterBy).then(function(invoicesPageData) {
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

      that.$onInit = function() {
        var state = store$.getState();
        that.carrierId = state.carrier.carrierId;
        that.repDetails = state.rep;
        that.defaultFilterText = 'By Received Date';
        that.filterText = that.defaultFilterText;
        that.statusEnums = invoiceEnums.STATUSES;

        that.unbilledLoads = routesConfig.INDEX.unbilledLoads.name;
        that.paging = new PagingModel(appConstants.LIMIT.invoicesList);
        that.fetchActiveInvoices();
      };
    }
  });
