angular.module('echo.index.carrier.myCompany.userProfile', [
  'echo.api.portalUser',
  'echo.components.portalUsers',
  'echo.components.tabBar',
  'echo.components.passwordValidation',
  'echo.components.resendInvite',
  'echo.components.loading',
  'echo.config.routes',
  'echo.models.passwordChange',
  'echo.services.user',
  'echo.index.carrier.myCompany.userProfile.changePassword'
])
  .component('myCompanyUserProfile', {
    templateUrl: 'app/pages/index/carrier/components/my-company/components/my-company-user-profile/my-company-user-profile.template.html',
    bindings: {
      portalUser: '<',
      goBackHandler: '&',
      reloadPortalHandler: '&',
      showLoading: '='
    },
    controller: function (userService, PasswordChangeModel) {
      var that = this;

      that.passwordChange = new PasswordChangeModel();
      that.currentPassword = null;
      that.user = userService.getUser();

      that.goBackToPortal = function () {
        that.goBackHandler();
      };

      that.userProfileUpdated = function () {
        that.reloadPortalHandler();
      };
    }
  });
