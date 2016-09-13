angular.module('echo.components.modal.milestones.sendLoadUpdate.droppedLoad', [
  'echo.components.dateTimePicker',
  'echo.components.modal.milestones.locationSearch',
  'echo.components.modal.milestones.documentUpload'
])
  .component('droppedLoad', {
    templateUrl: 'app/common/components/modal/milestones/send-load-update-modal/components/dropped-load/dropped-load.template.html',
    bindings: {
      location: '=',
      dateTimePicker: '<',
      timeZones: '<'
    },
    controller: function () {
    }
  });
