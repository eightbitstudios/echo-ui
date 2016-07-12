angular.module('echo.index.myCarriers.repAdmin.carrierDetailsUser', [
  'echo.config.routes',
  'echo.services.portalUser'
])
  .component('carrierDetailsUser', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/carrier-details-user/carrier-details-user.template.html',
    controller: function ($stateParams, routesConfig, portalUserService) {
      var that = this;

      this.routesConfig = routesConfig;
      that.carrierId = $stateParams.carrierId;

      var userId = $stateParams.userId;
      if (userId) {
        portalUserService.fetchPortalUserById(that.carrierId, userId).then(function (user) {
          that.portalUser = user;
        });
      }
    }
  });
