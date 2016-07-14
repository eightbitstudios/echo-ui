angular.module('echo.index.myCarriers.repAdmin.carrierDetails', [
  'echo.index.myCarriers.repAdmin.driverList',
  'echo.config.routes',
  'echo.services.carrier',
  'echo.components.portalUsers',
  'echo.components.loading',
  'echo.components.portalUserProfile',
  'echo.components.resendInvite'
])
  .component('carrierDetails', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/carrier-details/carrier-details.template.html',
    bindings: {},
    controller: function ($stateParams, $q, carrierService, routesConfig) {
      var that = this;

      that.mode = {
        DETAILS: 0,
        PORTAL_USER: 1
      };

      that.showLoading = false;

      that.userRoute = routesConfig.INDEX.carrierDetailsPortalUser;
      that.carrierId = $stateParams.carrierId;

      that.getCarrier = function (carrierId) {
        that.showLoading = true;
        return carrierService.fetchCarrierById(carrierId).then(function (carrier) {
          that.carrier = carrier;

          if (that.carrier.isActive) {
            $q.all([
              carrierService.fetchCarrierPortalUsers(carrier.carrierId),
              carrierService.fetchCarrierDriverCount(carrier.carrierId)
            ]).then(_.spread(function (portalUsers, drivers) {
              that.portalUsers = portalUsers;
              that.driverCount = drivers.userCount;
              that.showLoading = false;
            }));
          } else {
            that.showLoading = false;
          }
        });
      };

      that.showPortalUserHandler = function (user) {
        that.portalUser = user || {};
        that.showPortalUser();
      };

      that.loadCarrierDetails = function () {
        that.getCarrier(that.carrierId).then(function () {
          that.showDetailsHandler();
        });
      };

      that.showDetailsHandler = function () {
        that.showMode = that.mode.DETAILS;
      };

      that.showPortalUser = function () {
        that.showMode = that.mode.PORTAL_USER;
      };

      that.loadCarrierDetails();
    }
  });
