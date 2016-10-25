'use strict';

angular.module('echo.directives.googleMapsInfoWindow', [
  'echo.config.globals'
])
  .component('googleMapsInfoWindow', {
    require: {
      mapsCtrl: '^googleMaps',
      markerCtrl: '^googleMapsMarker'
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    controller: function ($element, google) {

      var that = this;

      that.$onInit = function () {

        var infoWindow = new google.maps.InfoWindow({
          content: $element[0]
        });

        that.markerCtrl.marker.addListener('click', function () {
          infoWindow.open(that.mapsCtrl.map, that.markerCtrl.marker);
        });
      };
    }
  });
