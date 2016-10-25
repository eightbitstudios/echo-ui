'use strict';

angular.module('echo.directives.googleMaps', [
  'echo.config.globals'
])
  .directive('googleMaps', function (google) {
    return {
      restrict: 'E',
      scope: {
        lat: '<',
        lng: '<',
        zoom: '<'
      },
      template: '<div class="map"><ng-transclude></ng-transclude></div>',
      transclude: true,
      controller: function ($scope, $element) {
        this.map = new google.maps.Map($element.find('.map')[0], {
          center: {lat: $scope.lat, lng: $scope.lng},
          zoom: $scope.zoom
        });

        $scope.map = this.map;
      }
    };
  });
