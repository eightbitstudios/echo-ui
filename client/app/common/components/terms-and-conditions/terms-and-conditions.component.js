angular.module('echo.components.termsAndConditions', [
  'echo.components.loadingButton'
]).component('termsAndConditions', {
  templateUrl: 'app/common/components/terms-and-conditions/terms-and-conditions.template.html',
  bindings: {
    modalActions: '<',
    acceptFooter: '<'
  },
  controller: function () {}
});
