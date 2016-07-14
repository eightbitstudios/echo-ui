angular.module('echo.index.myCarriers.carrierAdmin.myCompany.portalUsers', [
  'echo.services.carrier',
  'echo.services.carrierDetails',
  'echo.config.routes',
  'echo.components.portalUsers',
  'echo.components.loading'
])
  .component('myCompanyPortalUsers', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/components/my-company-portal-users/my-company-portal-users.template.html',
    bindings: {},
    controller: function ($state, carrierService, carrierDetailsService, routesConfig) {
      var that = this;

      that.showLoading = true;
      
      that.carrier = carrierDetailsService.getCarrierDetails();
      carrierService.fetchCarrierPortalUsers(that.carrier.carrierId).then(function (portalUsers) {
        that.portalUsers = portalUsers;
        that.showLoading = false;
      });

      that.userTileClickHandler = function(user) {
        var params = {};

        if(user){
          params = {userId: user.Id};
        }
        
        $state.go(routesConfig.INDEX.myCompanyUsersProfile.name, params);
      };
    }
  });
