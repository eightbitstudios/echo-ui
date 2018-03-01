angular.module('echo.index.carrier.loadManagement.unbilledLoads', [
  'echo.components.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads',
  'echo.models.paging',
  'echo.components.pagination',
  'echo.config.appConstants',
  'echo.index.carrier.loadManagement.loadsFilter',
  'echo.constants.loadTypes',
  'echo.components.filterButton'
]).component('unbilledLoads', {
  templateUrl: 'unbilled-loads.component.html',
  bindings: {},
  controller: function(store$, loadsApi, PagingModel, appConstants, loadTypeConstants) {

    var that = this;

    that.getUnbilledLoads = function() {

      that.showLoading = true;
      loadsApi.fetchUnbilledLoads(that.carrierId, that.paging, that.isPODNeeded, that.isInvoiceNeeded).then(function(unbilledLoadData) {
        that.paging.totalRecords = unbilledLoadData.totalLoadCount;
        that.paging.recordCount = _.size(unbilledLoadData.loads);
        that.unbilledLoads = unbilledLoadData.loads;
      }).finally(function() {
        that.showLoading = false;
      });
    };

    that.invoiceNeededHandler = function(value) {
      if (!value) {
        that.filterText = that.defaultFilterText;
      } else {
        that.filterText = 'By Invoice Needed';
      }
      that.isPODNeeded = false;
      that.isInvoiceNeeded = value;
      that.paging.reset();
      that.getUnbilledLoads();
    };

    that.podNeededHandler = function(value) {
      if (!value) {
        that.filterText = that.defaultFilterText;
      } else {
        that.filterText = 'By POD Needed';
      }
      that.isInvoiceNeeded = false;
      that.isPODNeeded = value;
      that.paging.reset();
      that.getUnbilledLoads();
    };

    that.$onInit = function() {
      var state = store$.getState();

      that.repDetails = state.rep;
      that.carrierId = state.carrier.carrierId;
      that.showLoading = false;
      that.paging = new PagingModel(appConstants.LIMIT.loadsList);
      that.isInvoiceNeeded = false;
      that.loadType = loadTypeConstants.UNBILLED;
      that.isPODNeeded = false;
      that.defaultFilterText = 'By Last Delivery Stop';
      that.filterText = that.defaultFilterText;

      that.getUnbilledLoads();
    };
  }
});