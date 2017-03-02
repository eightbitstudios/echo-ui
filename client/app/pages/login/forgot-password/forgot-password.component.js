angular.module('echo.login.forgotPassword', [
  'echo.config.routes',
  'echo.config.appConstants',
  'echo.api.authentication',
  'echo.components.serverErrors'
]).component('forgotPassword', {
  templateUrl: 'app/pages/login/forgot-password/forgot-password.component.html',
  controller: function($state, routesConfig, authenticationApi, appConstants) {

    this.sendHandler = function() {
      var that = this;

      that.serverError = null;
      if (that.forgotPasswordForm.$valid) {
        that.showButtonLoading = true;
        that.showValidationError = false;
        authenticationApi.forgotPassword(that.email).then(function() {
          $state.go(routesConfig.LOGIN.signIn.name);
        }).catch(function(errorCode) {
          that.serverError = errorCode;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      } else {
        that.showValidationError = true;
      }
    };

    this.$onInit = function() {
      this.email = '';
      this.forgotPasswordForm = null;
      this.showButtonLoading = false;
      this.showValidationError = false;
      this.serverError = null;
      this.appConstants = appConstants;
      this.emailValidation = appConstants.REGEX.emailValidation;
    };
  }
});