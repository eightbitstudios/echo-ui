angular.module('echo.components.modal.milestones.reportLoaded.finishLoading', [
  'echo.components.modal.disclaimer'
])
  .component('finishLoading', {
    templateUrl: 'finish-loading.component.html',
    bindings: {
      dateTimePicker: '=',
      timeZones: '<',
      totalWeight: '<',
      weightConfirmed: '='
    }
  });
