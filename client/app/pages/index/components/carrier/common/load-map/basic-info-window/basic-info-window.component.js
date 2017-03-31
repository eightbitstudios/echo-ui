angular.module('echo.components.loadMap.basicInfoWindow', [])
  .component('basicInfoWindow', {
    templateUrl: 'basic-info-window.component.html',
    bindings: {
      mapPoint: '<'
    }
  });
