angular.module('echo.login.createPassword', [
  'echo.components.passwordValidation',
  'echo.components.loadingButton',
  'echo.config.routes',
  'echo.models.passwordChange',
  'echo.api.authentication'
]).component('createPassword', {
  templateUrl: 'app/pages/login/create-password/create-password.template.html',
  controller: function ($stateParams, $state, $window, routesConfig, authenticationApi, PasswordChangeModel) {
    var that = this;
    that.token = $stateParams.validationToken;
    that.userId = $stateParams.userId;
    that.passwordChange = new PasswordChangeModel();
    that.showButtonLoading = false;
    
    that.createPassword = function () {
      that.showButtonLoading = true;

      authenticationApi.createPassword(that.userId, that.token, that.passwordChange).then(function () {
        $window.location = routesConfig.INDEX.base.url;
      }).catch(function () {
        $state.go(routesConfig.LOGIN.start.name, { invalidToken: true });
      }).finally(function () {
          that.showButtonLoading = false;
      });
    };
  }
});
