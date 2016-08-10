angular.module('echo.index.carrier', [
  'echo.index.carrier.myCompany',
  'echo.index.carrier.dashboard',
  'echo.index.carrier.carrierAdminNav',
  'echo.index.carrier.loadManagement',
  'echo.components.navbar'
]).component('carrier', {
  bindings: {
    repDetails: '<',
    carrierDetails: '<'
  },
  templateUrl: 'app/pages/index/carrier/carrier.template.html',
  controller: function () {
    var that = this;
    
    that.carrierId = that.carrierDetails.carrierId;
  }
});
