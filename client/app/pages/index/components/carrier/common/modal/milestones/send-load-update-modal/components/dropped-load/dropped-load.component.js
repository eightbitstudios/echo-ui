angular.module('echo.components.modal.milestones.sendLoadUpdate.droppedLoad', [
  'echo.components.dateTimePicker',
  'echo.components.modal.milestones.locationSearch'
])
  .component('droppedLoad', {
    templateUrl: 'dropped-load.component.html',
    bindings: {
      location: '=',
      dateTimePicker: '<',
      timeZones: '<'
    }
  });
