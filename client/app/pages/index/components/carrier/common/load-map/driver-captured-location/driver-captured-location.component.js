angular.module('echo.components.loadMap.driverCapturedLocation', [
  'echo.filters.formatCityState'
])
  .component('driverCapturedLocation', {
    templateUrl: 'driver-captured-location.component.html',
    bindings: {
      location: '<',
      timeStamp: '<',
      capturedBy: '<'
    }
  });
