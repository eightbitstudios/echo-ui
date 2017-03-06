angular.module('echo.components.modal.milestones.reportArrivalModal.components.arrivalSidebar', [
  'echo.components.modal.milestones.addressInfo',
  'echo.components.modal.milestones.driverInfo'
]).component('arrivalSidebar', {
  templateUrl: 'app/common/components/modal/milestones/report-arrival-modal/components/arrival-sidebar/arrival-sidebar.component.html',
  bindings: {
    load: '<',
    reportArrival: '<'
  }
});
