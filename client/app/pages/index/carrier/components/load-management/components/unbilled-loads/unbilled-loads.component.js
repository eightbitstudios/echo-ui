angular.module('echo.index.carrier.loadManagement.unbilledLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads',
  'echo.models.paging',
  'echo.components.pagination',
  'echo.config.appConstants',
  'echo.index.carrier.loadManagement.loadsFilter',
  'echo.enums.loadTypes',
  'echo.components.filterButton'
]).component('unbilledLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/unbilled-loads/unbilled-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function (loadsApi, PagingModel, appConstants, loadTypesEnum) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);
    that.isInvoiceNeeded = false;
    that.loadType = loadTypesEnum.UNBILLED;
    that.isPODNeeded = false;

    that.getUnbilledLoads = function () {
      that.showLoading = true;
      loadsApi.fetchUnbilledLoads(that.carrierId, that.paging, that.isPODNeeded, that.isInvoiceNeeded).then(function (unbilledLoadData) {
        that.paging.totalRecords = unbilledLoadData.totalLoadCount;
        that.paging.recordCount = _.size(unbilledLoadData.loads);
        that.unbilledLoads = unbilledLoadData.loads;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.invoiceNeededHandler = function (value) {
      that.isPODNeeded = false;
      that.isInvoiceNeeded = value;
      that.paging.reset();
      that.getUnbilledLoads();
    };

    that.podNeededHandler = function (value) {
      that.isInvoiceNeeded = false;
      that.isPODNeeded = value;
      that.paging.reset();
      that.getUnbilledLoads();
    };

    that.$onInit = that.getUnbilledLoads;
  }
});
