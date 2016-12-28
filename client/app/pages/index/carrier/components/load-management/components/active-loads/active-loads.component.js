angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.components.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.index.carrier.loadManagement.loadsFilter',
  'echo.enums.loadTypes',
  'echo.components.filterButton',
  'echo.components.loadMap',
  'echo.services.loadCount'
]).component('activeLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function (loadsApi, PagingModel, appConstants, loadTypesEnum, loadCountService) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);
    that.isPickUpToday = false;
    that.loadType = loadTypesEnum.ACTIVE;
    that.isDeliveriesToday = false;
    var defaultFilterText = 'By Next Appointment';
    that.filterText = defaultFilterText;

    that.deliveriesTodayHandler = function (value) {
      if (!value) {
        that.filterText = defaultFilterText;
      } else {
        that.filterText = 'By Next Delivery';
      }

      that.isPickUpToday = false;
      that.isDeliveriesToday = value;
      that.paging.reset();
      that.getPageData(true, false, false);
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
      that.getPageData(true, false, false);
    };

    that.getPageData = function (activeLoads, mapLoads, loadsCount) {
      if (activeLoads) {
        that.showLoading = true;
      }
      if (mapLoads) {
        that.showMap = false;
        that.mapPoints = [];
      }

      loadsApi.fetchActiveLoadsPage(that.carrierId, that.paging, that.isPickUpToday, that.isDeliveriesToday, activeLoads, mapLoads, loadsCount).then(function (activeLoadsPageData) {
        if (activeLoads) {
          that.paging.totalRecords = activeLoadsPageData.loads.totalLoadCount;
          that.paging.recordCount = _.size(activeLoadsPageData.loads.loads);
          that.activeLoads = activeLoadsPageData.loads.loads;
          that.showLoading = false;
        }
        if (mapLoads) {
          that.mapPoints = activeLoadsPageData.mapLoads;
          that.showMap = true;
        }
        if(loadsCount) {
          loadCountService.setLoadCount(activeLoadsPageData.loadsCount);
        }
      });
    };

    that.refreshPageData = function () {
      that.getPageData(true, true, false);
    };

    that.$onInit = function () {
      var fetchLoadCount = _.isEmpty(loadCountService.getLoadCount());
       
      that.getPageData(true, true, fetchLoadCount);
    };
  }
});
