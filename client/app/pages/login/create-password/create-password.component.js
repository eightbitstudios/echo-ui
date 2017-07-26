angular.module('echo.login.createPassword', [
  'echo.components.passwordValidation',
  'echo.components.loadingButton',
  'echo.config.routes',
  'echo.config.appConstants',
  'echo.models.passwordChange',
  'echo.api.authentication',
  'echo.services.modal',
  'echo.components.modal.termsAndConditions'
]).component('createPassword', {
  bindings: {
    showTerms: '<'
  },
  templateUrl: 'create-password.component.html',
  controller: function($stateParams, $state, $window, routesConfig, authenticationApi, PasswordChangeModel, appConstants, modalService) {

    this.createPassword = function() {
      var that = this;

      that.showButtonLoading = true;
      var passwordChangeService = that.showTerms ? authenticationApi.createPassword : authenticationApi.changePassword;

      passwordChangeService(that.userId, that.token, that.passwordChange).then(function() {
        $window.location = routesConfig.INDEX.base.url;
      }).catch(function() {
        $state.go(routesConfig.LOGIN.signIn.name, {
          invalidToken: true
        });
      }).finally(function() {
        that.showButtonLoading = false;
      });
    };

    this.showTermsAndConditionsModal = function() {
      var that = this;

      var modalInstance = modalService.open({
        component: 'terms-and-conditions',
        bindings: {
          acceptFooter: true
        }
      }).result;

      modalInstance.then(function(agree) {
        if (agree) {
          that.agree = agree;
        }
      });
    };

    this.$onInit = function() {
      this.token = $stateParams.validationToken;
      this.userId = $stateParams.userId;
      this.passwordChange = new PasswordChangeModel();
      this.showButtonLoading = false;
      this.appConstants = appConstants;
      this.agree = !this.showTerms;
    };
  }
});