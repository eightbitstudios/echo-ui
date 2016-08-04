angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact'
]).component('activeLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
    bindings: {
      repDetails: '<'
    },
    controller: function () {
      var that = this;

      that.showLoading = false;
    }
  });
