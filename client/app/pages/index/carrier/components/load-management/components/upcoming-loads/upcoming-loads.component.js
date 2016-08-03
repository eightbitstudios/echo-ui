angular.module('echo.index.carrier.loadManagement.upcomingLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.services.repDetails'
])
  .component('upcomingLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/upcoming-loads/upcoming-loads.template.html',
    bindings: {},
    controller: function (repDetailsService) {
      this.repDetails = repDetailsService.getRepDetails();
    }
  });
