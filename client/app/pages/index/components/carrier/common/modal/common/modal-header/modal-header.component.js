angular.module('echo.components.modal.modalHeader', [])
  .component('modalHeader', {
    templateUrl: 'modal-header.component.html',
    bindings: {
      headerText: '@',
      modalActions: '<',
      loadNumber: '<',
      proNumber: '<',
      refresh: '<'
    }
  });