angular.module('echo.components.modal.milestones.reportLoaded.finishLoading', [
  'echo.components.modal.disclaimer'
])
  .component('finishLoading', {
    templateUrl: 'app/common/components/modal/milestones/report-loaded-modal/components/finish-loading/finish-loading.component.html',
    bindings: {
      dateTimePicker: '=',
      timeZones: '<',
      totalWeight: '<',
      weightConfirmed: '='
    }
  });
