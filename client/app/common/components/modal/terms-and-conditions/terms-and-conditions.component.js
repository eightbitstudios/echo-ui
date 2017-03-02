angular.module('echo.components.modal.termsAndConditions', [
  'echo.components.loadingButton'
]).component('termsAndConditions', {
  templateUrl: 'app/common/components/modal/terms-and-conditions/terms-and-conditions.template.html',
  bindings: {
    modalActions: '<',
    acceptFooter: '<'
  }
});
