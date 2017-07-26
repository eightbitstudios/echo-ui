angular.module('echo.components.modal.milestones.milestoneSidebar', [
  'echo.components.shippingDetails',
  'echo.components.modal.milestones.driverInfo'
]).component('milestoneSidebar', {
  templateUrl: 'milestone-sidebar.component.html',
  bindings: {
    load: '<'
  }
});