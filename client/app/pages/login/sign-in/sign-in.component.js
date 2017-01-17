angular.module('echo.login.signIn', [
  'echo.api.authentication',
  'echo.config.routes',
  'echo.config.appConstants',
  'echo.config.errors',
  'echo.components.serverErrors'
]).component('signIn', {
  templateUrl: 'app/pages/login/sign-in/sign-in.template.html',
  controller: function($window, $location, $state, $stateParams, routesConfig, authenticationApi, errorsConfig, appConstants) {

    /**
     * Call api to sign a user in
     */
    this.signInHandler = function() {
      var that = this;

      that.serverError = null;
      if (that.signInForm.$valid) {
        that.showButtonLoading = true;
        authenticationApi.signIn(that.email, that.password).then(function() {
          var queryParams = $location.search();
          if (!_.isEmpty(queryParams.redirect)) {
            $window.location = '/' + queryParams.redirect;
          } else {
            $window.location = routesConfig.INDEX.base.url;
          }
        }).catch(function(errorCode) {
          if (errorCode === errorsConfig.LOCKED) {
            $state.go(routesConfig.LOGIN.forgotPassword.name);
          }
          that.serverError = errorCode;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      }
    };

    this.$onInit = function() {
      this.routesConfig = routesConfig;
      this.email = '';
      this.password = '';
      this.invalidToken = !_.isUndefined($stateParams.invalidToken);
      this.showButtonLoading = false;
      this.signInForm = null;
      this.errorsConfig = errorsConfig;
      this.appConstants = appConstants;
    };
  }
});