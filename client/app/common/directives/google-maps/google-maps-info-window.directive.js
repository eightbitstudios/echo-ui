'use strict';

angular.module('echo.directives.googleMapsInfoWindow', [
  'echo.config.globals'
])
  .directive('googleMapsInfoWindow', function (google) {
    return {
      restrict: 'E',
      require:'^googleMapsMarker',
      link: function(scope, element, attrs, markerController) {
        var content = 'TEST POST PLEASE IGNORE';

        var infoWindow = new google.maps.InfoWindow({
          content: content
        });

        markerController.marker.addListener('click', function() {
          infoWindow.open(markerController.map, markerController.marker);
        });
      }
    };
  });
