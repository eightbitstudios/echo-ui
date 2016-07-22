angular.module('echo.login.signIn', [
  'echo.api.authentication',
  'echo.config.routes',
  'echo.config.appConstants',
  'echo.config.errors'
]).component('signIn', {
  templateUrl: 'app/pages/login/sign-in/sign-in.template.html',
  controller: function ($window, $state, $stateParams, routesConfig, authenticationApi, errorsConfig, appConstants) {
    var that = this;

    that.routesConfig = routesConfig;
    that.email = '';
    that.password = '';
    that.invalidToken = !_.isUndefined($stateParams.invalidToken);
    that.showButtonLoading = false;
    that.signInForm = null;
    that.errorsConfig = errorsConfig;
    that.appConstants = appConstants;

    /**
     * Call api to sign a user in
     */
    that.signInHandler = function () {
      that.serverError = null;
      if (that.signInForm.$valid) {
        that.showButtonLoading = true;
        authenticationApi.signIn(that.email, that.password).then(function () {
          $window.location = routesConfig.INDEX.myCarriers.url;
        }).catch(function (errorCode) {
          if (errorCode === errorsConfig.LOCKED) {
            $state.go(routesConfig.LOGIN.forgotPassword.name);
          } else {
            that.serverError = errorCode;
          }
        }).finally(function () {
          that.showButtonLoading = false;
        });
      }
    };
  }
});
