angular.module('echo.index.carrier.loadManagement.upcomingLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants'
]).component('upcomingLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/upcoming-loads/upcoming-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function (loadsApi, PagingModel, appConstants) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);

    that.getUpcomingLoads = function () {
      that.showLoading = true;
      loadsApi.fetchUpcomingLoads(that.carrierId, that.paging).then(function (upcomingLoadData) {
        that.paging.totalRecords = upcomingLoadData.totalLoadCount;
        that.paging.recordCount = _.size(upcomingLoadData.loads);
        that.upcomingLoads = upcomingLoadData.loads;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.$onInit = that.getUpcomingLoads;
  }
});
