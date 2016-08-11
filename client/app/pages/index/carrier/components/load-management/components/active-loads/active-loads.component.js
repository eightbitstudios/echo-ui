angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.index.carrier.loadManagement.loadsFilter',
  'echo.enums.loadTypes',
  'echo.components.filterButton'
]).component('activeLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function (loadsApi, PagingModel, appConstants, loadTypesEnum) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);
    that.isPickUpToday = false;
    that.loadType = loadTypesEnum.ACTIVE;
    that.isDeliveriesToday = false;


    that.getAvailableLoads = function () {
      that.showLoading = true;
      loadsApi.fetchAvailableLoads(that.carrierId, that.paging, that.isPickUpToday, that.isDeliveriesToday).then(function (availableLoadData) {
        that.paging.totalRecords = availableLoadData.totalLoadCount;
        that.paging.recordCount = _.size(availableLoadData.loads);
        that.activeLoads = availableLoadData.loads;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.deliveriesTodayHandler = function (value) {
      that.isPickUpToday = false;
      that.isDeliveriesToday = value;
      that.paging.reset();
      that.getAvailableLoads();
    };

    that.pickupsTodayHandler = function (value) {
      that.isDeliveriesToday = false;
      that.isPickUpToday = value;
      that.paging.reset();
      that.getAvailableLoads();
    };

    that.$onInit = that.getAvailableLoads;
  }
});
