angular.module('echo.index.myCarriers.repAdmin.carrierDetails', [
  'echo.index.myCarriers.repAdmin.driverList',
  'echo.config.routes',
  'echo.services.carrier',
  'echo.services.portalUser',
  'echo.enums.carrier',
  'echo.components.portalUsers',
  'echo.components.portalUserProfile'
])
  .component('carrierDetails', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/carrier-details/carrier-details.template.html',
    bindings: {},
    controller: function ($stateParams, carrierService, carrierEnum, routesConfig, portalUserService) {
      var that = this;

      that.mode = {
        DETAILS: 0,
        PORTAL_USER: 1
      };

      that.showMode = that.mode.DETAILS;

      that.userRoute = routesConfig.INDEX.carrierDetailsPortalUser;
      that.carrierId = $stateParams.carrierId;

      carrierService.fetchCarrierById(that.carrierId).then(function (carrier) {
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

      that.showPortalUserHandler = function (user) {
        if (user) {
          portalUserService.fetchPortalUserById(that.carrierId, user.userId).then(function (user) {
            that.portalUser = user;
            that.showPortalUser();
          });
        } else {
          that.portalUser = {};
          that.showPortalUser();
        }
      };

      that.showDetailsHandler = function () {
        that.showMode = that.mode.DETAILS;
      };

      that.showPortalUser = function () {
        that.showMode = that.mode.PORTAL_USER;
      };
    }
  });
