angular.module('echo.components.modal.termsAndConditions', [
  'echo.components.loadingButton'
]).component('termsAndConditions', {
  templateUrl: 'terms-and-conditions.component.html',
  bindings: {
    modalActions: '<',
    acceptFooter: '<'
  }
});
