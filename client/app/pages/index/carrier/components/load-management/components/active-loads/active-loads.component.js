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
  controller: function(loadsApi, PagingModel, appConstants, loadTypesEnum, loadCountService) {

    this.deliveriesTodayHandler = function(value) {
      if (!value) {
        this.filterText = this.defaultFilterText;
      } else {
        this.filterText = 'By Next Delivery';
      }

      this.isPickUpToday = false;
      this.isDeliveriesToday = value;
      this.paging.reset();
      this.getPageData(true, false, false);
    };

    this.pickupsTodayHandler = function(value) {
      if (!value) {
        this.filterText = this.defaultFilterText;
      } else {
        this.filterText = 'By Next Pickup';
      }
      this.isDeliveriesToday = false;
      this.isPickUpToday = value;
      this.paging.reset();
      this.getPageData(true, false, false);
    };

    this.getPageData = function(activeLoads, mapLoads, loadsCount) {
      var that = this;

      if (activeLoads) {
        that.showLoading = true;
      }
      if (mapLoads) {
        that.showMap = false;
        that.mapPoints = [];
      }

      loadsApi.fetchActiveLoadsPage(that.carrierId, that.paging, that.isPickUpToday, that.isDeliveriesToday, activeLoads, mapLoads, loadsCount).then(function(activeLoadsPageData) {
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

        if (loadsCount) {
          loadCountService.setLoadCount(activeLoadsPageData.loadsCount);
        }
      });
    };

    this.refreshPageData = function() {
      this.getPageData(true, true, false);
    };

    this.$onInit = function() {
      this.showLoading = false;
      this.paging = new PagingModel(appConstants.LIMIT.loadsList);
      this.isPickUpToday = false;
      this.loadType = loadTypesEnum.ACTIVE;
      this.isDeliveriesToday = false;
      this.defaultFilterText = 'By Next Appointment';
      this.filterText = this.defaultFilterText;
      var fetchLoadCount = _.isEmpty(loadCountService.getLoadCount());

      this.getPageData(true, true, fetchLoadCount);
    };
  }
});