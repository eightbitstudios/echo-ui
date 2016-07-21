angular.module('echo.login.signIn', [
  'echo.api.authentication',
  'echo.config.routes'
]).component('signIn', {
  templateUrl: 'app/pages/login/sign-in/sign-in.template.html',
  controller: function ($window, $stateParams, routesConfig, authenticationApi) {
    var that = this;

    that.routesConfig = routesConfig;
    that.email = '';
    that.password = '';
    that.invalidToken = !_.isUndefined($stateParams.invalidToken);
    that.showButtonLoading = false;
    that.signInForm = null;

    /**
     * Call api to sign a user in
     */
    that.signInHandler = function () {
      if (that.signInForm.email.$valid && that.signInForm.password.$valid) {
        that.showButtonLoading = true;
        authenticationApi.signIn(that.email, that.password).then(function () {
          $window.location = routesConfig.INDEX.myCarriers.url;
        }).catch(function () {
          //TODO: Handle error codes
        }).finally(function () {
          that.showButtonLoading = false;
        });
      }
    };
  }
});
