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
    controller: function(carrierApi, UserModel) {

      this.getCarrierPortalUsers = function() {
        var that = this;

        carrierApi.fetchCarrierPortalUsers(that.carrierId).then(function(portalUsers) {
          that.portalUsers = portalUsers;
          that.showLoading = false;
        });
      };

      this.userTileClickHandler = function(user) {
        this.showMode = this.mode.USER_PROFILE;
        this.portalUser = new UserModel(_.clone(user));
        this.portalUser.carrierId = this.carrierId;
      };

      this.showUsersPortal = function() {
        this.showMode = this.mode.USERS_PORTAL;
      };

      this.reloadUsersPortal = function() {
        this.showLoading = true;
        this.getCarrierPortalUsers();
        this.showUsersPortal();
      };

      this.$onInit = function() {

        this.mode = {
          USERS_PORTAL: 0,
          USER_PROFILE: 1
        };

        this.showMode = this.mode.USERS_PORTAL;
        this.showLoading = true;

        this.getCarrierPortalUsers();
      };
    }
  });