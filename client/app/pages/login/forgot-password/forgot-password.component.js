angular.module('echo.login.forgotPassword', [
  'echo.config.routes',
  'echo.config.appConstants',
  'echo.api.authentication',
  'echo.components.serverErrors'
]).component('forgotPassword', {
  templateUrl: 'app/pages/login/forgot-password/forgot-password.template.html',
  controller: function ($state, routesConfig, authenticationApi, appConstants) {
    var that = this;

    that.email = '';
    that.forgotPasswordForm = null;
    that.showButtonLoading = false;
    that.showValidationError = false;
    that.serverError = null;
    that.appConstants = appConstants;

    that.sendHandler = function () {
      that.serverError = null;
      if (that.forgotPasswordForm.$valid) {
        that.showButtonLoading = true;
        that.showValidationError = false;
        authenticationApi.forgotPassword(that.email).then(function () {
          $state.go(routesConfig.LOGIN.signIn.name);
        }).catch(function (errorCode) {
          that.serverError = errorCode;
        }).finally(function () {
          that.showButtonLoading = false;
        });
      } else {
        that.showValidationError = true;
      }
    };
  }
});
