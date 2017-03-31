angular.module('echo.index.carrier.loadManagement.upcomingLoads', [
  'echo.components.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.constants.loadTypes'
]).component('upcomingLoads', {
  templateUrl: 'upcoming-loads.component.html',
  bindings: {},
  controller: function(store$, loadsApi, PagingModel, appConstants, loadTypeConstants) {

    var that = this;

    that.getUpcomingLoads = function() {
      that.showLoading = true;
      loadsApi.fetchUpcomingLoads(that.carrierId, that.paging, that.isDriverNeeded).then(function(upcomingLoadData) {
        that.paging.totalRecords = upcomingLoadData.totalLoadCount;
        that.paging.recordCount = _.size(upcomingLoadData.loads);
        that.upcomingLoads = upcomingLoadData.loads;
      }).finally(function() {
        that.showLoading = false;
      });
    };

    that.driverNeededHandler = function(value) {
      if (!value) {
        that.filterText = that.defaultFilterText;
      } else {
        that.filterText = 'By Driver Needed';
      }
      that.isDriverNeeded = value;
      that.paging.reset();
      that.getUpcomingLoads();
    };

    that.$onInit = function() {
      var state = store$.getState();

      that.repDetails = state.rep;
      that.carrierId = state.carrier.carrierId;
      that.showLoading = false;
      that.paging = new PagingModel(appConstants.LIMIT.loadsList);
      that.loadType = loadTypeConstants.UPCOMING;
      that.defaultFilterText = 'By First Pickup Stop';
      that.filterText = that.defaultFilterText;
      that.getUpcomingLoads();
    };
  }
});