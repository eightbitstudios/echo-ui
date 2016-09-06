angular.module('echo.components.modal.milestones.reportArrivalModal.components.arrivalSidebar', [
  'echo.components.modal.milestones.addressInfo',
  'echo.components.modal.milestones.driverInfo'
]).component('arrivalSidebar', {
  templateUrl: 'app/common/components/modal/milestones/report-arrival-modal/components/arrival-sidebar/arrival-sidebar.template.html',
  bindings: {
    load: '<'
  },
  controller: function () {
  }
});
