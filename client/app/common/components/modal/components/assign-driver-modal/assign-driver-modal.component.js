angular.module('echo.components.modal.assignDriver', [
  'echo.components.modal'
])
  .component('assignDriverModal', {
    templateUrl: 'app/common/components/modal/components/assign-driver-modal/assign-driver-modal.template.html',
    bindings: {
      modalActions: '<',
      loadTypeEnum: '<'
    },
    controller: function(){
    }
  });