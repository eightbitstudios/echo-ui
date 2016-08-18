angular.module('echo.index.carrier.loadManagement.loadDetails', [
  'echo.components.echoRepContact',
  'echo.components.stopAccordion',
  'echo.index.carrier.loadManagement.loadDetails.loadDetail'
])
  .component('loadDetails', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/load-details.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function () {
    }
  });
