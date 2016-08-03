angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact',
  'echo.services.repDetails'
])
  .component('activeLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
    bindings: {},
    controller: function (repDetailsService) {
      this.repDetails = repDetailsService.getRepDetails();
    }
  });
