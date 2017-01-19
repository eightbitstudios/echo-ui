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
  'echo.components.originDestinationMap',
  'echo.services.loadCount',
  'echo.api.requestBuilder.activeLoads'
]).component('activeLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<',
    testBinding: '<'
  },
  controller: function(loadsApi, PagingModel, appConstants, loadTypesEnum, loadCountService, ActiveLoadsRequestBuilder) {

    this.deliveriesTodayHandler = function(value) {
      this.filterText = value ? 'By Next Delivery' : this.defaultFilterText;

      this.isPickUpToday = false;
      this.isDeliveriesToday = value;
      this.paging.reset();

      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(this.carrierId);

      if (this.isDeliveriesToday) {
        activeLoadsPageApiRequest.filterByDeliveriesToday();
      }

      this.getPageData(activeLoadsPageApiRequest);
    };

    this.pickupsTodayHandler = function(value) {

      this.filterText = value ? 'By Next Pickup' : this.defaultFilterText;
      this.isDeliveriesToday = false;
      this.isPickUpToday = value;
      this.paging.reset();

      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(this.carrierId);

      if (this.isPickUpToday) {
        activeLoadsPageApiRequest.filterByPickupsToday();
      }

      this.getPageData(activeLoadsPageApiRequest);
    };

    this.getPageData = function(requestBuilder) {
      var that = this;

      if (requestBuilder.hasMapData()) {
        that.showMap = false;
        that.mapPoints = [];
      }

      that.showLoading = true;

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

    this.fetchActiveLoads = function() {
      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(this.carrierId);
      this.getPageData(activeLoadsPageApiRequest);
    };

    this.toggleExpandedMap = function () {
      this.showExpandedMap = true;
      this.showLoadDetailsMap = false;
    };

    this.shrinkMap = function () {
      this.showExpandedMap = false;
      this.showLoadDetailsMap = false;
    };

    this.viewMapHandler = function(mapPoint) {
      this.loadDetailsMapPoint = mapPoint;
      this.showExpandedMap = false;
      this.showLoadDetailsMap = true;
    };

    this.refreshPageData = function() {
      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(this.carrierId);
      activeLoadsPageApiRequest.fetchMapData();
      this.getPageData(activeLoadsPageApiRequest);
    };


    this.$onInit = function() {
      this.showLoading = false;
      this.paging = new PagingModel(appConstants.LIMIT.loadsList);
      this.isPickUpToday = false;
      this.loadType = loadTypesEnum.ACTIVE;
      this.isDeliveriesToday = false;
      this.showExpandedMap = false;
      this.showLoadDetailsMap = false;

      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(this.carrierId);
      activeLoadsPageApiRequest.fetchMapData();

      this.defaultFilterText = 'By Next Appointment';
      this.filterText = this.defaultFilterText;
      var fetchLoadCount = _.isEmpty(loadCountService.getLoadCount());

      if (fetchLoadCount) {
        activeLoadsPageApiRequest.fetchLoadsCount();
      }

      this.getPageData(activeLoadsPageApiRequest);
    };
  }
});
