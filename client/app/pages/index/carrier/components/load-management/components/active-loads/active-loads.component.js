angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants'
]).component('activeLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
  bindings: {
    repDetails: '<',
    activeLoadCount: '=',
    carrierId: '<'
  },
  controller: function (loadsApi, PagingModel, appConstants) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);

    that.getAvailableLoads = function () {
      that.showLoading = true;
      loadsApi.fetchAvailableLoads(that.carrierId, that.paging).then(function (availableLoadData) {
        that.paging.totalRecords = availableLoadData.totalLoadCount;
        that.paging.recordCount = _.size(availableLoadData.loads);
        that.activeLoads = availableLoadData.loads;
        that.activeLoadCount = availableLoadData.totalLoadCount;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.$onInit = that.getAvailableLoads;
  }
});
