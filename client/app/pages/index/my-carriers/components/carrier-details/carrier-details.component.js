angular.module('echo.index.myCarriers.carrierDetails', [
  'echo.index.myCarriers.driverList',
  'echo.config.routes',
  'echo.api.carrier',
  'echo.components.portalUsers',
  'echo.components.loading',
  'echo.components.portalUserProfile',
  'echo.components.resendInvite',
  'echo.models.user'
])
  .component('carrierDetails', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-details/carrier-details.template.html',
    bindings: {},
    controller: function ($stateParams, $q, carrierApi, routesConfig, UserModel) {
      var that = this;

      that.mode = {
        DETAILS: 0,
        PORTAL_USER: 1
      };

      that.showLoading = false;

      that.carrierId = $stateParams.carrierId;
      that.usersRoute = routesConfig.INDEX.myCompanyUsers;
      that.driverRoute = routesConfig.INDEX.myCompanyDrivers;

      that.getCarrier = function (carrierId) {
        that.showLoading = true;
        return carrierApi.fetchCarrierById(carrierId).then(function (carrier) {
          that.carrier = carrier;

          if (that.carrier.isActive) {
            $q.all([
              carrierApi.fetchCarrierPortalUsers(carrier.carrierId),
              carrierApi.fetchCarrierDriverCount(carrier.carrierId)
            ]).then(_.spread(function (portalUsers, drivers) {
              that.portalUsers = portalUsers;
              that.driverCount = _.get(drivers, 'userCount');
              that.showLoading = false;
            }));
          } else {
            that.showLoading = false;
          }
        });
      };

      that.showPortalUserHandler = function (user) {
        that.portalUser = user || new UserModel({carrierId: that.carrier.carrierId});
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
