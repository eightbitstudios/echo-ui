angular.module('echo.components.modal.modalHeader', [])
  .component('modalHeader', {
    templateUrl: 'app/common/components/modal/components/modal-header/modal-header.template.html',
    bindings: {
      headerText: '@',
      modalActions: '<',
      loadNumber: '<',
      proNumber: '<'
    }
  });