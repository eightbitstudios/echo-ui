angular.module('echo.login.forgotPassword', [
  'echo.config.routes',
  'echo.api.authentication'
]).component('forgotPassword', {
  templateUrl: 'app/pages/login/forgot-password/forgot-password.template.html',
  controller: function ($state, routesConfig, authenticationApi) {
    var that = this;

    that.email = '';
    that.forgotPasswordForm = null;
    that.showButtonLoading = false;

    that.sendHandler = function () {
      if (that.forgotPasswordForm.$valid) {
        that.showButtonLoading = true;
        authenticationApi.forgotPassword(that.email).then(function () {
          $state.go(routesConfig.LOGIN.signIn.name);
        }).catch(function () { })
          .finally(function () {
            that.showButtonLoading = false;
          });
      }
    };
  }
});
