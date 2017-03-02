angular.module('echo.components.passwordValidation', []).component('passwordValidation', {
  bindings: {
    passwordChange: '<'
  },
  templateUrl: 'app/common/components/password-validation/password-validation.template.html'
});
