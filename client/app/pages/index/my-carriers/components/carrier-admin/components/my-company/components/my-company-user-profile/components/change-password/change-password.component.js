angular.module('echo.index.myCarriers.carrierAdmin.myCompany.userProfile.changePassword', [
  'echo.components.passwordValidation',
  'echo.config.routes',
  'echo.config.errors',
  'echo.api.authentication',
  'echo.models.passwordChange'
])
  .component('changePassword', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/components/my-company-user-profile/components/change-password/change-password.template.html',
    bindings: {
      userId: '<'
    },
    controller: function (authenticationApi, PasswordChangeModel, errorsConfig) {
      var that = this;

      that.passwordChange = new PasswordChangeModel();
      that.currentPassword = null;
      that.showButtonLoading = false;
      that.changePasswordForm = null;
      that.errorsConfig = errorsConfig;


      that.changePasswordHandler = function () {
        if (that.changePasswordForm.$valid) {
          that.serverError = null;
          that.showButtonLoading = true;
          authenticationApi.changePassword(that.userId, that.currentPassword, that.passwordChange).catch(function (errorCode) {
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
