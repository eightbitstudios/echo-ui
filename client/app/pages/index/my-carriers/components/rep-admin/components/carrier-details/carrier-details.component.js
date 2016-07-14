angular.module('echo.index.myCarriers.repAdmin.carrierDetails', [
  'echo.index.myCarriers.repAdmin.driverList',
  'echo.config.routes',
  'echo.services.carrier',
  'echo.services.portalUser',
  'echo.components.portalUsers',
  'echo.components.loading',
  'echo.components.portalUserProfile',
  'echo.components.resendInvite'
])
  .component('carrierDetails', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/carrier-details/carrier-details.template.html',
    bindings: {},
    controller: function ($stateParams, $q, carrierService, routesConfig, portalUserService) {
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
            var portalUsersPromise = carrierService.fetchCarrierPortalUsers(carrier.carrierId).then(function (portalUsers) {
              that.portalUsers = portalUsers;
            });

            var driverCountPromise = carrierService.fetchCarrierDriverCount(carrier.carrierId).then(function (driverCount) {
              that.driverCount = driverCount.userCount;
            });

            $q.all([portalUsersPromise, driverCountPromise]).then(function () {
              that.showLoading = false;
            });
          }
        });
      };

      that.showPortalUserHandler = function (user) {
        if (user) {
          that.showLoading = true;
          portalUserService.fetchPortalUserById(that.carrierId, user.userId).then(function (user) {
            that.portalUser = user;
            that.showPortalUser();
            that.showLoading = false;
          });
        } else {
          that.portalUser = {};
          that.showPortalUser();
        }
      };

      that.loadCarrierDetails = function () {
        that.showLoading = true;
        that.getCarrier(that.carrierId).then(function () {
          that.showDetailsHandler();
          that.showLoading = false;
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
