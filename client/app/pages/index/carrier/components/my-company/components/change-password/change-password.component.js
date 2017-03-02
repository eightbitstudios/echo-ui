angular.module('echo.index.carrier.myCompany.userProfile.changePassword', [
    'echo.components.passwordValidation',
    'echo.components.serverErrors',
    'echo.config.routes',
    'echo.config.errors',
    'echo.config.appConstants',
    'echo.api.authentication',
    'echo.models.passwordChange'
  ])
  .component('changePassword', {
    templateUrl: 'app/pages/index/carrier/components/my-company/components/change-password/change-password.template.html',
    bindings: {
      userId: '<'
    },
    controller: function(authenticationApi, PasswordChangeModel, errorsConfig, appConstants) {

      this.changePasswordHandler = function() {
        var that = this;

        if (that.changePasswordForm.$valid) {
          that.serverError = null;
          that.showButtonLoading = true;
          that.passwordChanged = false;
          authenticationApi.changePassword(that.userId, that.passwordChange).then(function() {

            that.passwordChanged = true;
          }).catch(function(errorCode) {
            that.serverError = errorCode;
          }).finally(function() {
            that.showButtonLoading = false;
          });
        }
      };

      this.clearServerErrors = function() {
        this.serverError = null;
      };

      this.$onInit = function() {
        this.passwordChange = new PasswordChangeModel();
        this.currentPassword = null;
        this.showButtonLoading = false;
        this.changePasswordForm = null;
        this.passwordChanged = false;
        this.errorsConfig = errorsConfig;
        this.appConstants = appConstants;
      };
    }
  });