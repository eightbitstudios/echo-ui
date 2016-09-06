angular.module('echo.components.modal.milestones.test', [
  'echo.components.modal.milestones.pickupAtYard'
])
  .component('testModal', {
    templateUrl: 'app/common/components/modal/milestones/test-modal/test-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      carrierId: '<',
      timeZones: '<'
    },
    controller: function () {
    }
  });