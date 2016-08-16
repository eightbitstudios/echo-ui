angular.module('echo.components.modal.assignDriver', [])
  .component('assignDriverModal', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/assign-driver-modal.template.html',
    bindings: {
      modalActions: '<',
      loadTypeEnum: '<'
    },
    controller: function () {
    }
  });