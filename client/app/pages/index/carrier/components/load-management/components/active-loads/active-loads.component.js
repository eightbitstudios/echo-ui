angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.components.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.components.dateTimePicker',
  'echo.index.carrier.loadManagement.loadsFilter',
  'echo.enums.loadTypes',
  'echo.components.mapPlaceholder',
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
    var defaultFilterText = 'By Next Appointment';
    that.filterText = defaultFilterText;

    that.getAvailableLoads = function () {
      that.showLoading = true;
      that.activeLoads = [];
      loadsApi.fetchAvailableLoads(that.carrierId, that.paging, that.isPickUpToday, that.isDeliveriesToday).then(function (availableLoadData) {
        that.paging.totalRecords = availableLoadData.totalLoadCount;
        that.paging.recordCount = _.size(availableLoadData.loads);
        that.activeLoads = availableLoadData.loads;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.deliveriesTodayHandler = function (value) {
      if (!value) {
        that.filterText = defaultFilterText;
      } else {
        that.filterText = 'By Next Delivery';
      }

      that.isPickUpToday = false;
      that.isDeliveriesToday = value;
      that.paging.reset();
      that.getAvailableLoads();
    };

    that.pickupsTodayHandler = function (value) {
      if (!value) {
        that.filterText = defaultFilterText;
      } else {
        that.filterText = 'By Next Pickup';
      }
      that.isDeliveriesToday = false;
      that.isPickUpToday = value;
      that.paging.reset();
      that.getAvailableLoads();
    };

    that.$onInit = that.getAvailableLoads;
  }
});
