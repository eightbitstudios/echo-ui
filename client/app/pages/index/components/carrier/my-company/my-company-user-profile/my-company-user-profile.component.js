angular.module('echo.index.carrier.myCompany.userProfile', [
  'echo.api.portalUser',
  'echo.components.portalUsers',
  'echo.components.tabBar',
  'echo.components.passwordValidation',
  'echo.components.usage',
  'echo.components.loading',
  'echo.config.routes',
  'echo.models.passwordChange',
  'echo.services.userProfile',
  'echo.index.carrier.myCompany.userProfile.changePassword'
])
  .component('myCompanyUserProfile', {
    templateUrl: 'my-company-user-profile.component.html',
    bindings: {
      portalUser: '<',
      goBackHandler: '&',
      reloadPortalHandler: '&',
      showLoading: '=',
      carrierId: '<'
    },
    controller: function(store$, PasswordChangeModel) {

      this.goBackToPortal = function() {
        this.goBackHandler();
      };

      this.userProfileUpdated = function() {
        this.reloadPortalHandler();
      };

      this.$onInit = function() {
        this.passwordChange = new PasswordChangeModel();
        this.currentPassword = null;
        this.user = store$.getState().user;
      };
    }
  });
