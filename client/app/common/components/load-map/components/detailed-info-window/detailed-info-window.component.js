angular.module('echo.components.loadMap.detailedInfoWindow', [
  'echo.components.loadMap.detailedInfoWindow.location',
  'echo.components.loadMap.detailedInfoWindow.driverCapturedLocation',
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber'
])
  .component('detailedInfoWindow', {
    templateUrl: 'app/common/components/load-map/components/detailed-info-window/detailed-info-window.template.html',
    bindings: {
      mapPoint: '<'
    },
    controller: function (routesConfig) {
      this.loadDetails = routesConfig.INDEX.loadDetails.name;
    }
  });
