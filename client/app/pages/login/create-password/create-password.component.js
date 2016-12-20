angular.module('echo.login.createPassword', [
  'echo.components.passwordValidation',
  'echo.components.loadingButton',
  'echo.config.routes',
  'echo.config.appConstants',
  'echo.models.passwordChange',
  'echo.api.authentication',
  'echo.services.modal',
  'echo.components.termsAndConditions'
]).component('createPassword', {
  templateUrl: 'app/pages/login/create-password/create-password.template.html',
  controller: function ($stateParams, $state, $window, routesConfig, authenticationApi, PasswordChangeModel, appConstants, modalService) {
    var that = this;
    that.token = $stateParams.validationToken;
    that.userId = $stateParams.userId;
    that.passwordChange = new PasswordChangeModel();
    that.showButtonLoading = false;
    that.appConstants = appConstants;
    that.agree = false;

    that.createPassword = function () {
      that.showButtonLoading = true;

      authenticationApi.createPassword(that.userId, that.token, that.passwordChange).then(function () {
        $window.location = routesConfig.INDEX.base.url;
      }).catch(function () {
        $state.go(routesConfig.LOGIN.signIn.name, { invalidToken: true });
      }).finally(function () {
          that.showButtonLoading = false;
      });
    };

    that.showTermsAndConditionsModal = function () {
      var modalInstance = modalService.open({
        component: 'terms-and-conditions'
      }).result;

      modalInstance.then(function (agree) {
        if (agree) {
          that.agree = agree;
        }
      });
    };
  }
});
