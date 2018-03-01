angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.components.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.index.carrier.loadManagement.loadsFilter',
  'echo.constants.loadTypes',
  'echo.components.filterButton',
  'echo.components.loadMap',
  'echo.api.requestBuilder.activeLoads',
  'echo.components.originDestinationMap',
  'echo.actions',
  'echo.index.actionsCreators.loadCounts'
]).component('activeLoads', {
  templateUrl: 'active-loads.component.html',
  bindings: {},
  controller: function(loadsApi, PagingModel, appConstants, store$, loadCountsActionCreator, loadTypeConstants, ActiveLoadsRequestBuilder) {

    var that = this;

    that.deliveriesTodayHandler = function(value) {
      that.filterText = value ? 'By Next Delivery' : that.defaultFilterText;

      that.isPickUpToday = false;
      that.isDeliveriesToday = value;
      that.paging.reset();

      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(that.carrierId);

      if (that.isDeliveriesToday) {
        activeLoadsPageApiRequest.filterByDeliveriesToday();
      }

      that.getPageData(activeLoadsPageApiRequest);
    };

    that.pickupsTodayHandler = function(value) {

      that.filterText = value ? 'By Next Pickup' : that.defaultFilterText;
      that.isDeliveriesToday = false;
      that.isPickUpToday = value;
      that.paging.reset();

      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(that.carrierId);

      if (that.isPickUpToday) {
        activeLoadsPageApiRequest.filterByPickupsToday();
      }

      that.getPageData(activeLoadsPageApiRequest);
    };

    that.getPageData = function(requestBuilder) {

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
          var action = loadCountsActionCreator.setLoadCounts(activeLoadsPageData.loadsCount);
          store$.dispatch(action);
        }
      });
    };

    that.fetchActiveLoads = function() {
      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(that.carrierId);
      that.getPageData(activeLoadsPageApiRequest);
      that.activeLoads = null;
    };

    that.toggleExpandedMap = function() {
      that.showExpandedMap = true;
      that.showLoadDetailsMap = false;
    };

    that.shrinkMap = function() {
      that.showExpandedMap = false;
      that.showLoadDetailsMap = false;
    };

    that.viewMapHandler = function(mapPoint) {
      that.loadDetailsMapPoint = mapPoint;
      that.showExpandedMap = false;
      that.showLoadDetailsMap = true;
    };

    that.refreshPageData = function() {
      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(that.carrierId);
      activeLoadsPageApiRequest.fetchMapData();
      that.getPageData(activeLoadsPageApiRequest);
    };


    that.$onInit = function() {

      var state = store$.getState();
      that.showExpandedMap = false;
      that.showLoadDetailsMap = false;
      that.carrierId = state.carrier.carrierId;
      that.repDetails = state.rep;

      that.showLoading = false;
      that.paging = new PagingModel(appConstants.LIMIT.loadsList);
      that.isPickUpToday = false;
      that.loadType = loadTypeConstants.ACTIVE;
      that.isDeliveriesToday = false;
      that.loadCountAction = {};
      var activeLoadsPageApiRequest = new ActiveLoadsRequestBuilder(that.carrierId);
      activeLoadsPageApiRequest.fetchMapData();

      that.defaultFilterText = 'By Next Appointment';
      that.filterText = that.defaultFilterText;

      if (_.isEmpty(state.loadCounts)) {
        activeLoadsPageApiRequest.fetchLoadsCount();
      }

      that.getPageData(activeLoadsPageApiRequest);
    };
  }
});