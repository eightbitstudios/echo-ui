angular.module('echo.index.carrier.loadManagement.unbilledLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads'
])
  .component('unbilledLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/unbilled-loads/unbilled-loads.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function (loadsApi) {
      var that = this;
      that.showLoading = true;
      loadsApi.fetchUnbilledLoads(that.carrierId).finally(function () {
        that.showLoading = false;
      });
    }
  });
