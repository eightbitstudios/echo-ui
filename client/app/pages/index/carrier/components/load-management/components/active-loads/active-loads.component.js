angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.components.pagination',
  'echo.models.paging'
]).component('activeLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function (loadsApi, PagingModel) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(10);

    that.getAvailableLoads = function () {
      that.showLoading = true;
      loadsApi.fetchAvailableLoads(that.carrierId, that.paging).then(function (availableLoadData) {
        that.paging.totalRecords = availableLoadData.totalRecords;
        that.activeLoads = availableLoadData.data;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.$onInit = that.getAvailableLoads;
  }
});
