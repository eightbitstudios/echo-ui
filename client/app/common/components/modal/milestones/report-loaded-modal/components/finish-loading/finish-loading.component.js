angular.module('echo.components.modal.milestones.reportLoaded.finishLoading', [])
  .component('finishLoading', {
    templateUrl: 'app/common/components/modal/milestones/report-loaded-modal/components/finish-loading/finish-loading.template.html',
    bindings: {
      dateTimePicker: '=',
      timeZones: '<',
      totalWeight: '<',
      weightConfirmed: '='
    }
  });
