angular.module('echo.index.carrier.loadManagement.upcomingLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads',
  'echo.components.pagination',
  'echo.models.paging'
])
  .component('upcomingLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/upcoming-loads/upcoming-loads.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function (loadsApi, PagingModel) {
      var that = this;
      that.showLoading = false;
      that.paging = new PagingModel(10);

      that.getUpcomingLoads = function () {
        that.showLoading = true;
        loadsApi.fetchUpcomingLoads(that.carrierId, that.paging).then(function (upcomingLoadData) {
          that.paging.totalRecords = upcomingLoadData.totalRecords;
          that.activeLoads = upcomingLoadData.data;
        }).finally(function () {
          that.showLoading = false;
        });
      };

      that.$onInit = that.getUpcomingLoads;
    }
  });
