angular.module('echo.components.loadMap.detailedInfoWindow', [
  'echo.components.loadMap.detailedInfoWindow.location',
  'echo.components.loadMap.driverCapturedLocation',
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber'
])
  .component('detailedInfoWindow', {
    templateUrl: 'app/common/components/load-map/components/detailed-info-window/detailed-info-window.template.html',
    bindings: {
      mapPoint: '<'
    },
    controller: function (routesConfig) {
      var that = this;

      that.noDriver = _.isUndefined(that.mapPoint.driver.id);
      that.loadDetails = routesConfig.INDEX.loadDetails.name;
    }
  });
