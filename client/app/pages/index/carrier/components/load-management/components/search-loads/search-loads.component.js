angular.module('echo.index.carrier.loadManagement.searchLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.models.paging',
  'echo.config.appConstants'
]).component('searchLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/search-loads/search-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function (loadsApi, PagingModel, appConstants) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);

    that.getAvailableLoads = function () {
      that.showLoading = true;
      loadsApi.fetchAvailableLoads(that.carrierId, that.paging).then(function (availableLoadData) {
        that.paging.totalRecords = availableLoadData.totalRecords;
        that.paging.recordCount = _.size(availableLoadData.data);
        that.activeLoads = availableLoadData.data;
        that.activeLoadCount = availableLoadData.totalRecords;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.$onInit = that.getAvailableLoads;
  }
});
