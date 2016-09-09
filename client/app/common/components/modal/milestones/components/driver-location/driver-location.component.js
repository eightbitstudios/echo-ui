angular.module('echo.components.modal.milestones.driverLocation', [
  'echo.components.modal.milestones.locationSearch',
  'echo.components.dateTimePicker'
])
  .component('driverLocation', {
    templateUrl: 'app/common/components/modal/milestones/components/driver-location/driver-location.template.html',
    bindings: {
      location: '=',
      dateTimePicker: '=',
      timeZones: '<'
    },
    controller: function () {
    }
  });