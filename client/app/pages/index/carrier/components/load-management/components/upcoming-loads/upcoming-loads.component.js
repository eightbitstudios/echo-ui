angular.module('echo.index.carrier.loadManagement.upcomingLoads', [
  'echo.components.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.enums.loadTypes'
]).component('upcomingLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/upcoming-loads/upcoming-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function (loadsApi, PagingModel, appConstants, loadTypesEnum) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);
    that.loadType = loadTypesEnum.UPCOMING;
    var defaultFilterText = 'By First Pickup Stop';
    that.filterText = defaultFilterText;

    that.getUpcomingLoads = function () {
      that.showLoading = true;
      that.upcomingLoads = [];
      loadsApi.fetchUpcomingLoads(that.carrierId, that.paging, that.isDriverNeeded).then(function (upcomingLoadData) {
        that.paging.totalRecords = upcomingLoadData.totalLoadCount;
        that.paging.recordCount = _.size(upcomingLoadData.loads);
        that.upcomingLoads = upcomingLoadData.loads;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.driverNeededHandler = function(value) {
      if (!value) {
        that.filterText = defaultFilterText;
      } else {
        that.filterText = 'By Driver Needed';
      }
      that.isDriverNeeded = value;
      that.paging.reset();
      that.getUpcomingLoads();
    };

    that.$onInit = that.getUpcomingLoads;
  }
});
