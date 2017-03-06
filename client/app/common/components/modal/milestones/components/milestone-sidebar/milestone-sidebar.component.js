angular.module('echo.components.modal.milestones.milestoneSidebar', [
  'echo.components.shippingDetails',
  'echo.components.modal.milestones.driverInfo'
]).component('milestoneSidebar', {
  templateUrl: 'app/common/components/modal/milestones/components/milestone-sidebar/milestone-sidebar.component.html',
  bindings: {
    load: '<'
  }
});