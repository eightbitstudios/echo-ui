angular.module('echo.index.carrier.myCompany.portalUsers', [
  'echo.services.carrier',
  'echo.services.carrierDetails',
  'echo.config.routes',
  'echo.components.portalUsers',
  'echo.components.portalUserProfile',
  'echo.components.loading',
  'echo.models.user',
  'echo.index.carrier.myCompany.userProfile'
])
  .component('myCompanyPortalUsers', {
    templateUrl: 'app/pages/index/carrier/components/my-company/components/my-company-portal-users/my-company-portal-users.template.html',
    bindings: {},
    controller: function ($stateParams, $state, carrierService, carrierDetailsService, UserModel) {
      var that = this;

      that.mode = {
        USERS_PORTAL: 0,
        USER_PROFILE: 1
      };

      that.showMode = that.mode.USERS_PORTAL;
      that.showLoading = true;

      that.carrierId = $stateParams.carrierId;

      that.getCarrierPortalUsers = function () {
        carrierService.fetchCarrierPortalUsers(that.carrierId).then(function (portalUsers) {
          that.portalUsers = portalUsers;
          that.showLoading = false;
        });
      };

      that.userTileClickHandler = function (user) {
        that.showMode = that.mode.USER_PROFILE;
        that.portalUser = user || new UserModel({ carrierId: that.carrierId });
      };

      that.showUsersPortal = function () {
        that.showMode = that.mode.USERS_PORTAL;
      };

      that.reloadUsersPortal = function () {
        that.showLoading = true;
        that.getCarrierPortalUsers();
        that.showUsersPortal();
      };

      that.getCarrierPortalUsers();
    }
  });
