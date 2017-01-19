angular.module('echo.index.carrier', [
  'echo.index.carrier.myCompany',
  'echo.index.carrier.dashboard',
  'echo.index.carrier.carrierAdminNav',
  'echo.index.carrier.loadManagement',
  'echo.components.navbar',
  'echo.services.loadCount'
]).component('carrier', {
  bindings: {
    repDetails: '<',
    carrierDetails: '<'
  },
  templateUrl: 'app/pages/index/carrier/carrier.template.html',
  controller: function(loadCountService) {
    this.$onInit = function() {
      this.carrierId = this.carrierDetails.carrierId;
      loadCountService.clear();
    };
  }
});