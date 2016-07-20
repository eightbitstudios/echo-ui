angular.module('echo.login.signIn', [
  'echo.api.authentication',
  'echo.config.routes'
]).component('signIn', {
  templateUrl: 'app/pages/login/sign-in/sign-in.template.html',
  controller: function ($window, routesConfig, authenticationApi) {
    var that = this;

    that.username = '';
    that.password = '';
    that.showButtonLoading = false;

    /**
     * Call api to sign a user in
     */
    that.signInHandler = function () {
      that.showButtonLoading = true;
      authenticationApi.signIn(that.username, that.password).then(function () {
        $window.location = routesConfig.INDEX.myCarriers.url;
      }).catch(function () {
        //TODO: Handle error codes
      }).finally(function () {
        that.showButtonLoading = false;
      });
    };
  }
});
