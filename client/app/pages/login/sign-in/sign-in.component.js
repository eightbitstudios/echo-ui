angular.module('echo.login.signIn', [
  'echo.api.authentication',
  'echo.config.routes',
  'echo.services.user',
  'echo.config.errors'
]).component('signIn', {
  templateUrl: 'app/pages/login/sign-in/sign-in.template.html',
  controller: function ($window, $state, $stateParams, routesConfig, authenticationApi, errorsConfig, userService) {
    var that = this;

    that.routesConfig = routesConfig;
    that.email = '';
    that.password = '';
    that.invalidToken = !_.isUndefined($stateParams.invalidToken);
    that.showButtonLoading = false;
    that.signInForm = null;
    that.errorsConfig = errorsConfig;

    /**
     * Call api to sign a user in
     */
    that.signInHandler = function () {
      that.serverError = null;
      if (that.signInForm.$valid) {
        that.showButtonLoading = true;
        authenticationApi.signIn(that.email, that.password).then(function (loginTokens) {
          var user = userService.mapJwtToUser(loginTokens.access_token); // jshint ignore:true

          if(user.isRepAdmin()){
            $window.location = routesConfig.INDEX.myCarriers.url;
          }else{
            $window.location = routesConfig.INDEX.myCompany.url({carrierId: user.carrierId});
          }
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
