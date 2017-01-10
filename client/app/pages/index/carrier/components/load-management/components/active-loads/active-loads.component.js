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
  'echo.services.loadCount',
  'echo.api.activeLoadsPage'
]).component('activeLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<',
    testBinding: '<'
  },
  controller: function(loadsApi, PagingModel, appConstants, loadTypesEnum, loadCountService, activeLoadsPageApi) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);
    that.isPickUpToday = false;
    that.loadType = loadTypesEnum.ACTIVE;
    that.isDeliveriesToday = false;
    var defaultFilterText = 'By Next Appointment';
    that.filterText = defaultFilterText;

    that.deliveriesTodayHandler = function(value) {
     
      that.filterText = value ? 'By Next Delivery' : defaultFilterText;
      that.isPickUpToday = false;
      that.isDeliveriesToday = value;
      that.paging.reset();

      var activeLoadsPageApiRequest = new this.RequestBuilder(this.carrierId);

      if (that.isDeliveriesToday) {
        activeLoadsPageApiRequest.filterByDeliveriesToday();
      }

      that.getPageData(activeLoadsPageApiRequest);
    };

    that.pickupsTodayHandler = function(value) {
      
      that.filterText = value ? 'By Next Pickup' : defaultFilterText;
      that.isDeliveriesToday = false;
      that.isPickUpToday = value;
      that.paging.reset();

      var activeLoadsPageApiRequest = new this.RequestBuilder(this.carrierId);

      if (that.isPickUpToday) {
        activeLoadsPageApiRequest.filterByPickupsToday();
      }

      that.getPageData(activeLoadsPageApiRequest);
    };

    that.getPageData = function(requestBuilder) {
      //if (activeLoads) {
      //that.showLoading = true;
      // }
      //if (mapLoads) {
      //that.showMap = false;
      //that.mapPoints = [];
      //}

      requestBuilder.fetchActiveLoads(that.paging).execute().then(function(activeLoadsPageData) {
        if (activeLoadsPageData.loads) {
          that.paging.totalRecords = activeLoadsPageData.loads.totalLoadCount;
          that.paging.recordCount = _.size(activeLoadsPageData.loads.loads);
          that.activeLoads = activeLoadsPageData.loads.loads;
          that.showLoading = false;
        }
        if (activeLoadsPageData.mapLoads) {
          that.mapPoints = activeLoadsPageData.mapLoads;
          that.showMap = true;
        }

        if (activeLoadsPageData.loadsCount) {
          loadCountService.setLoadCount(activeLoadsPageData.loadsCount);
        }
      });
    };

    that.refreshPageData = function() {
      var activeLoadsPageApiRequest = new this.RequestBuilder(this.carrierId);
      activeLoadsPageApiRequest.fetchMapData();
      that.getPageData(activeLoadsPageApiRequest);
    };


    that.$onInit = function() {
      this.RequestBuilder = activeLoadsPageApi.getRequestBuilder();

      var activeLoadsPageApiRequest = new this.RequestBuilder(this.carrierId);
      activeLoadsPageApiRequest.fetchMapData();

      var fetchLoadCount = _.isEmpty(loadCountService.getLoadCount());

      if (fetchLoadCount) {
        activeLoadsPageApiRequest.fetchLoadsCount();
      }

      that.getPageData(activeLoadsPageApiRequest);
    };
  }
});