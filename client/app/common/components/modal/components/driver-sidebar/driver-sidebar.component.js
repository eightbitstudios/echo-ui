angular.module('echo.components.modal.driverSidebar', [
  'echo.components.equipment',
  'echo.components.shippingDetails'
])
  .component('driverSidebar', {
    templateUrl: 'app/common/components/modal/components/driver-sidebar/driver-sidebar.component.html',
    bindings: {
      load: '<',
      equipment: '<'
    }
  });