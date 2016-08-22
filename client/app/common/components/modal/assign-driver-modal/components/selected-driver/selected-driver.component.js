angular.module('echo.components.modal.assignDriver.selectedDriver', [
  'echo.filters.phoneNumber'
])
  .component('selectedDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/selected-driver/selected-driver.template.html',
    bindings: {
      driver: '<',
      removeCallback: '&'
    },
    controller: function () {}
  });