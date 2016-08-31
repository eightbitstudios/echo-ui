angular.module('echo.components.modal.milestones.reportEmpty', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.checkboxCard'
])
  .component('reportEmptyModal', {
    templateUrl: 'app/common/components/modal/milestones/report-empty-modal/report-empty-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<'
    },
    controller: function () {
    }
  });