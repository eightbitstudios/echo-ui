angular.module('echo.index.carrier.loadManagement.upcomingLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads'
])
  .component('upcomingLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/upcoming-loads/upcoming-loads.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function (loadsApi) {
      var that = this;

      that.showLoading = true;
      loadsApi.fetchUpcomingLoads(that.carrierId).then(function (activeLoads) {
        that.activeLoads = activeLoads;
      }).finally(function () {
        that.showLoading = false;
      });
    }
  });
