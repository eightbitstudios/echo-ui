angular.module('echo.components.modal.milestones.reportArrivalModal.components.arrivalSidebar', [
  'echo.components.modal.milestones.addressInfo',
  'echo.components.modal.milestones.driverInfo'
]).component('arrivalSidebar', {
  templateUrl: 'arrival-sidebar.component.html',
  bindings: {
    load: '<',
    reportArrival: '<'
  }
});
