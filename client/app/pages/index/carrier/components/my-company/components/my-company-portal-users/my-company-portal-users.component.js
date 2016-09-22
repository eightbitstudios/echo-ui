angular.module('echo.index.carrier.myCompany.portalUsers', [
  'echo.api.carrier',
  'echo.config.routes',
  'echo.components.portalUsers',
  'echo.components.portalUserProfile',
  'echo.components.loading',
  'echo.models.user',
  'echo.index.carrier.myCompany.userProfile'
])
  .component('myCompanyPortalUsers', {
    templateUrl: 'app/pages/index/carrier/components/my-company/components/my-company-portal-users/my-company-portal-users.template.html',
    bindings: {
      carrierId: '<'
    },
    controller: function (carrierApi, UserModel) {
      var that = this;

      that.mode = {
        USERS_PORTAL: 0,
        USER_PROFILE: 1
      };

      that.showMode = that.mode.USERS_PORTAL;
      that.showLoading = true;

      that.getCarrierPortalUsers = function () {
        carrierApi.fetchCarrierPortalUsers(that.carrierId).then(function (portalUsers) {
          that.portalUsers = portalUsers;
          that.showLoading = false;
        });
      };

      that.userTileClickHandler = function (user) {
        that.showMode = that.mode.USER_PROFILE;
        that.portalUser = new UserModel(_.clone(user));
        that.portalUser.carrierId = that.carrierId;
      };

      that.showUsersPortal = function () {
        that.showMode = that.mode.USERS_PORTAL;
      };

      that.reloadUsersPortal = function () {
        that.showLoading = true;
        that.getCarrierPortalUsers();
        that.showUsersPortal();
      };

      that.$onInit = function() {
        that.getCarrierPortalUsers();
      };
    }
  });
