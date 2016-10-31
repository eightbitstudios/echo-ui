angular.module('echo.components.loadMap.basicInfoWindow', [])
  .component('basicInfoWindow', {
    templateUrl: 'app/common/components/load-map/components/basic-info-window/basic-info-window.template.html',
    bindings: {
      mapPoint: '<'
    },
    controller: function () {
    }
  });
