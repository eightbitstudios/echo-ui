angular.module('echo.components.modal.driverSidebar', [
  'echo.components.equipment',
  'echo.components.shippingDetails'
])
  .component('driverSidebar', {
    templateUrl: 'driver-sidebar.component.html',
    bindings: {
      load: '<',
      equipment: '<'
    }
  });