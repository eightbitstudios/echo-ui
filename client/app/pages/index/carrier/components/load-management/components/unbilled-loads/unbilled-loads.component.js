angular.module('echo.index.carrier.loadManagement.unbilledLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact'
])
  .component('unbilledLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/unbilled-loads/unbilled-loads.template.html',
    bindings: {
      repDetails: '<'
    },
    controller: function () {      
      var that = this;

      that.showLoading = false;
    }
  });
