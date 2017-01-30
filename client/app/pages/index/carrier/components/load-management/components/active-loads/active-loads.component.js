angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.components.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.index.carrier.loadManagement.loadsFilter',
  'echo.enums.loadTypes',
  'echo.actions.actionDispatcher',
  'echo.components.filterButton',
  'echo.components.loadMap',
  'echo.api.requestBuilder.activeLoads',
  'echo.action'
]).component('activeLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
  bindings: {
    carrierId: '<'
  },
  controller: function(loadsApi, PagingModel, appConstants, actionDispatcher, store$, loadCountsActions, loadTypesEnum, ActiveLoadsRequestBuilder) {

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
          store$.dispatch({
            type: loadCountsActions.LOAD_COUNTS_LOADED,
            payload: activeLoadsPageData.loadsCount
          });
        }
      });
    };

    this.fetchActiveLoads = function() {
      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(this.carrierId);
      this.getPageData(activeLoadsPageApiRequest);
    };

    this.refreshPageData = function() {
      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(this.carrierId);
      activeLoadsPageApiRequest.fetchMapData();
      this.getPageData(activeLoadsPageApiRequest);
    };


    this.$onInit = function() {
      var that = this;

      that.showLoading = false;
      that.paging = new PagingModel(appConstants.LIMIT.loadsList);
      that.isPickUpToday = false;
      that.loadType = loadTypesEnum.ACTIVE;
      that.isDeliveriesToday = false;
      that.loadCountAction = {};
      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(that.carrierId);
      activeLoadsPageApiRequest.fetchMapData();

      that.defaultFilterText = 'By Next Appointment';
      that.filterText = that.defaultFilterText;

      if (_.isEmpty(store$.getState().loadCounts)) {
        activeLoadsPageApiRequest.fetchLoadsCount();
      }

      store$.subscribe(function(state) {
        that.repDetails = state.rep;
      });

      that.getPageData(activeLoadsPageApiRequest);
    };
  }
});