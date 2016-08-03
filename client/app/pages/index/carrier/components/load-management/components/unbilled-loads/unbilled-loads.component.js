angular.module('echo.index.carrier.loadManagement.unbilledLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.services.repDetails'
])
  .component('unbilledLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/unbilled-loads/unbilled-loads.template.html',
    bindings: {},
    controller: function (repDetailsService) {
      this.repDetails = repDetailsService.getRepDetails();
    }
  });
