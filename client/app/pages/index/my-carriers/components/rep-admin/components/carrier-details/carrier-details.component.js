angular.module('echo.index.myCarriers.repAdmin.carrierDetails', [
  'echo.index.myCarriers.repAdmin.driverList',
  'echo.index.myCarriers.repAdmin.carrierDetailsUser',
  'echo.config.routes',
  'echo.services.carrier',
  'echo.enums.carrier',
  'echo.components.portalUsers',
  'echo.components.portalUserProfile'
])
  .component('carrierDetails', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/carrier-details/carrier-details.template.html',
    bindings: {},
    controller: function ($stateParams, carrierService, carrierEnum, routesConfig) {
      var that = this;

      that.showPortalProfile = false;

      that.userRoute = routesConfig.INDEX.carrierDetailsPortalUser;

      carrierService.fetchCarrierById($stateParams.carrierId).then(function (carrier) {
        that.carrier = carrier;

        if (that.carrier.status !== carrierEnum.STATUS.INACTIVE) {
          carrierService.fetchCarrierPortalUsers(carrier.id).then(function (portalUsers) {
            that.portalUsers = portalUsers;
          });

          carrierService.fetchCarrierDriverCount(carrier.id).then(function (driverCount) {
            that.driverCount = driverCount.count;
          });
        }
      });
    }
  });
