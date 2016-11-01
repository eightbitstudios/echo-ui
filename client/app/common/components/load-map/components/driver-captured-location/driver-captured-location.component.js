angular.module('echo.components.loadMap.driverCapturedLocation', [
  'echo.filters.formatCityState'
])
  .component('driverCapturedLocation', {
    templateUrl: 'app/common/components/load-map/components/driver-captured-location/driver-captured-location.template.html',
    bindings: {
      location: '<',
      timeStamp: '<',
      capturedBy: '<'
    },
    controller: function () {
    }
  });
