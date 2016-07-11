angular.module('echo.index.myCarriers.repAdmin.carrierDetails', [
  'echo.services.carrier'
])
  .component('carrierDetails', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/carrier-details/carrier-details.template.html',
    bindings: {},
    controller: function ($stateParams, carrierService) {
      var that = this;

      carrierService.fetchCarrierById($stateParams.id).then(function(carrier){
        that.carrier = carrier;
      });
    }
  });
