angular.module('echo.index.carrier.loadManagement.upcomingLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact'
])
  .component('upcomingLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/upcoming-loads/upcoming-loads.template.html',
    bindings: {
      repDetails: '<'
    },
    controller: function () {      
      var that = this;
      that.showLoading = false;
    }
  });
