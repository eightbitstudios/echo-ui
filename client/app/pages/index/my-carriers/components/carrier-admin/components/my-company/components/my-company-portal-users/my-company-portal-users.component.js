angular.module('echo.index.myCarriers.carrierAdmin.myCompany.portalUsers', [
  'echo.services.carrier',
  'echo.services.carrierDetails',
  'echo.components.portalUsers'
])
  .component('myCompanyPortalUsers', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/components/my-company-portal-users/my-company-portal-users.template.html',
    bindings: {},
    controller: function (carrierService, carrierDetailsService) {
      var that = this;
      
      that.carrier = carrierDetailsService.getCarrierDetails();
      carrierService.fetchCarrierPortalUsers(that.carrier.id).then(function (portalUsers) {
        that.portalUsers = portalUsers;
      });
    }
  });
