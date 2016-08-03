angular.module('echo.index.carrier.myCompany.userProfile.changePassword', [
  'echo.components.passwordValidation',
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
    controller: function (authenticationApi, PasswordChangeModel, errorsConfig, appConstants) {
      var that = this;

      that.passwordChange = new PasswordChangeModel();
      that.currentPassword = null;
      that.showButtonLoading = false;
      that.changePasswordForm = null;
      that.passwordChanged = false;
      that.errorsConfig = errorsConfig;
      that.appConstants = appConstants;


      that.changePasswordHandler = function () {
        if (that.changePasswordForm.$valid) {
          that.serverError = null;
          that.showButtonLoading = true;
          that.passwordChanged = false;
          authenticationApi.changePassword(that.userId, that.currentPassword, that.passwordChange).then(function () {

            that.passwordChanged = true;
          }).catch(function (errorCode) {
            that.serverError = errorCode;
          }).finally(function () {
            that.showButtonLoading = false;
          });
        }
      };

      that.clearServerErrors = function () {
        that.serverError = null;
      };
    }
  });
