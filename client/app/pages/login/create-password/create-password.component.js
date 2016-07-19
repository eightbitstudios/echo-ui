angular.module('echo.login.createPassword', [
  'echo.components.passwordValidation',
  'echo.components.loadingButton',
  'echo.config.routes',
  'echo.models.passwordChange',
  'echo.api.authentication'
]).component('createPassword', {
  templateUrl: 'app/pages/login/create-password/create-password.template.html',
  controller: function ($stateParams, $state, routesConfig, authenticationApi, PasswordChangeModel) {
    var that = this;
    that.token = $stateParams.token;
    that.passwordChange = new PasswordChangeModel();
    that.showButtonLoading = false;
    
    that.createPassword = function () {
      that.showButtonLoading = true;

      authenticationApi.createPassword(that.token, that.passwordChange).then(function () {
        // TODO: Redirect to dashboard
      }).catch(function () {
        $state.go(routesConfig.LOGIN.start.name, { invalidToken: true });
      }).finally(function () {
          that.showButtonLoading = false;
      });
    };
  }
});
