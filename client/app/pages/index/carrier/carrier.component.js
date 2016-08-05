angular.module('echo.index.carrier', [
  'echo.index.carrier.myCompany',
  'echo.index.carrier.dashboard',
  'echo.api.carrier',
  'echo.index.carrier.carrierAdminNav',
  'echo.index.carrier.loadManagement',
  'echo.components.navbar'
]).component('carrier', {
  bindings: {
    repDetails: '<'
  },
  templateUrl: 'app/pages/index/carrier/carrier.template.html',
  controller: function ($stateParams, carrierApi) {
    var that = this;
    that.carrierId = $stateParams.carrierId;
    
    carrierApi.fetchCarrierById(that.carrierId).then(function (carrierDetails) {
      that.carrierDetails = carrierDetails;
      that.carrierId = carrierDetails.carrierId;
    });
  }
});
