angular.module('echo.index.myCarriers.carrierAdmin.myCompany.userProfile', [
  'echo.services.portalUser',
  'echo.services.carrierDetails',
  'echo.components.portalUsers',
  'echo.components.tabBar',
  'echo.components.resendInvite',
  'echo.components.loading',
  'echo.config.routes'
])
  .component('myCompanyUserProfile', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/components/my-company-user-profile/my-company-user-profile.template.html',
    bindings: {},
    controller: function ($stateParams, $state, routesConfig, portalUserService, carrierDetailsService) {
      var that = this;
      var userId = $stateParams.userId;
      that.routesConfig = routesConfig;
      that.carrier = carrierDetailsService.getCarrierDetails();
      if ($stateParams.userId) {
        that.showLoading = true;
        portalUserService.fetchPortalUserById(that.carrier.carrierId, userId).then(function (user) {
          that.portalUser = user;
        }).finally(function(){
          that.showLoading = false;
        });
      }

      that.goToCompanyPortalUsers = function () {
        $state.go(routesConfig.INDEX.myCompanyUsers.name);
      };
    }
  });
