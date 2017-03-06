angular.module('echo.components.modal.milestones.sendLoadUpdate.droppedLoad', [
  'echo.components.dateTimePicker',
  'echo.components.modal.milestones.locationSearch'
])
  .component('droppedLoad', {
    templateUrl: 'app/common/components/modal/milestones/send-load-update-modal/components/dropped-load/dropped-load.component.html',
    bindings: {
      location: '=',
      dateTimePicker: '<',
      timeZones: '<'
    }
  });
