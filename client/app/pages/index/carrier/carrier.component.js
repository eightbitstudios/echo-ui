angular.module('echo.index.carrier', [
  'echo.index.carrier.myCompany',
  'echo.index.carrier.dashboard',
  'echo.services.carrierDetails',
  'echo.index.carrier.carrierAdminNav',
  'echo.components.navbar'
]).component('carrier', {
  bindings: {},
  templateUrl: 'app/pages/index/carrier/carrier.template.html',
  controller: function ($stateParams, carrierDetailsService) {
    var that = this;
    carrierDetailsService.fetchCarrierById($stateParams.carrierId).then(function (carrierDetails) {
      that.carrierDetails = carrierDetails;
      that.carrierId = carrierDetails.carrierId;
    });
  }
});
