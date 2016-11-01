angular.module('echo.components.loadMap.detailedInfoWindow.driverCapturedLocation', [
  'echo.filters.formatCityState'
])
  .component('driverCapturedLocation', {
    templateUrl: 'app/common/components/load-map/components/detailed-info-window/components/driver-captured-location/driver-captured-location.template.html',
    bindings: {
      location: '<',
      timeStamp: '<',
      capturedBy: '<'
    },
    controller: function () {
    }
  });
