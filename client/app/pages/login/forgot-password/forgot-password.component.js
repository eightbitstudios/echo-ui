angular.module('echo.login.forgotPassword', [
  'echo.config.routes',
  'echo.config.errors',
  'echo.config.appConstants',
  'echo.api.authentication'
]).component('forgotPassword', {
  templateUrl: 'app/pages/login/forgot-password/forgot-password.template.html',
  controller: function ($state, errorsConfig, routesConfig, authenticationApi, appConstants) {
    var that = this;

    that.email = '';
    that.errorsConfig = errorsConfig;
    that.forgotPasswordForm = null;
    that.showButtonLoading = false;
    that.serverError = null;
    that.appConstants = appConstants;

    that.sendHandler = function () {
      that.serverError = null;
      if (that.forgotPasswordForm.$valid) {
        that.showButtonLoading = true;
        authenticationApi.forgotPassword(that.email).then(function () {
          $state.go(routesConfig.LOGIN.signIn.name);
        }).catch(function (errorCode) {
          that.serverError = errorCode;
        }).finally(function () {
          that.showButtonLoading = false;
        });
      }
    };
  }
});
