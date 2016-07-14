angular.module('echo.index.myCarriers.carrierAdmin.myCompany.portalUsers', [
  'echo.services.carrier',
  'echo.services.carrierDetails',
  'echo.config.routes',
  'echo.components.portalUsers',
  'echo.components.portalUserProfile',
  'echo.components.loading',
  'echo.index.myCarriers.carrierAdmin.myCompany.userProfile'
])
  .component('myCompanyPortalUsers', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/components/my-company-portal-users/my-company-portal-users.template.html',
    bindings: {},
    controller: function ($state, carrierService, carrierDetailsService) {
      var that = this;

      that.mode = {
        USERS_PORTAL: 0,
        USER_PROFILE: 1
      };

      that.showMode = that.mode.USERS_PORTAL;
      that.showLoading = true;

      that.carrier = carrierDetailsService.getCarrierDetails();

      that.getCarrierPortalUsers = function () {
        carrierService.fetchCarrierPortalUsers(that.carrier.carrierId).then(function (portalUsers) {
          that.portalUsers = portalUsers;
          that.showLoading = false;
        });
      };

      that.userTileClickHandler = function (user) {
        that.showMode = that.mode.USER_PROFILE;
        that.portalUser = user;
      };
      
      that.showUsersPortal = function () {
        that.showMode = that.mode.USERS_PORTAL;
      };

      that.reloadUsersPortal = function () {
        that.getCarrierPortalUsers();
        that.showUsersPortal();
      };

      that.getCarrierPortalUsers();
    }
  });
