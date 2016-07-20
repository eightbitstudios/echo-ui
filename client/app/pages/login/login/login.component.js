angular.module('echo.login.login', [
  'echo.api.authentication',
  'echo.config.routes'
]).component('login', {
  templateUrl: 'app/pages/login/login/login.template.html',
  controller: function ($window, routesConfig, authenticationApi) {
    var that = this;

    that.username = '';
    that.password = '';
    that.showButtonLoading = false;

    /**
     * Call api to sign user in
     */
    that.signIn = function () {
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
