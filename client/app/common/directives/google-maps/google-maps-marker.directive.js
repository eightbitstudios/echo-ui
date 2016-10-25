'use strict';

angular.module('echo.directives.googleMapsMarker', [
  'echo.config.globals'
])
  .directive('googleMapsMarker', function (google) {
    return {
      restrict: 'E',
      scope: {
        lat: '<',
        lng: '<'
      },
      require:'^googleMaps',
      controller: function ($scope) {
        this.marker = new google.maps.Marker({
          position: {lat: $scope.lat, lng: $scope.lng},
          map: $scope.map
        });

        this.map = $scope.$parent.map;
      }
    };
  });
