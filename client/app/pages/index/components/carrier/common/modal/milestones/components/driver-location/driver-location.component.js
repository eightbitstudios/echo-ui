angular.module('echo.components.modal.milestones.driverLocation', [
  'echo.components.modal.milestones.locationSearch',
  'echo.components.dateTimePicker'
])
  .component('driverLocation', {
    templateUrl: 'driver-location.component.html',
    bindings: {
      location: '=',
      dateTimePicker: '=',
      timeZones: '<',
      dateTimePickerText: '@'
    }
  });