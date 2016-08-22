angular.module('echo.components.modal.assignDriver.assignedDriverProfile', [
  'echo.filters.phoneNumber'
])
  .component('assignedDriverProfile', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/assigned-driver-profile/assigned-driver-profile.template.html',
    bindings: {
      driver: '<',
      changeDriverCallback: '&'
    },
    controller: function () {
    }
  });