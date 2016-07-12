angular.module('echo.index.myCarriers.carrierAdmin.myCompany', [
  'echo.components.portalUsers',
  'echo.services.carrier',
  'echo.services.carrierDetails'
])
  .component('myCompany', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/my-company.template.html',
    bindings: {},
    controller: function (carrierService, carrierDetailsService) {
      var that = this;
      that.carrier = carrierDetailsService.getCarrierDetails();
      carrierService.fetchCarrierPortalUsers(that.carrier.id).then(function (portalUsers) {
        that.portalUsers = portalUsers;
      });
    }
  });
