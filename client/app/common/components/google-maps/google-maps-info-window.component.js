'use strict';

angular.module('echo.components.googleMapsInfoWindow', [
  'echo.services.googleMapsApi'
])
  .component('googleMapsInfoWindow', {
    require: {
      mapsCtrl: '^googleMaps',
      markerCtrl: '^googleMapsMarker'
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    controller: function ($element, googleMapsApi) {

      var that = this;

      that.$onInit = function () {
        googleMapsApi.then(function (google) {
          var infoWindow = new google.maps.InfoWindow({
            content: $element[0],
            pixelOffset: new google.maps.Size(210, 255)
          });

          that.markerCtrl.marker.addListener('click', function () {
            if(that.mapsCtrl.openedInfoWindow){
              that.mapsCtrl.openedInfoWindow.close();
            }
            that.mapsCtrl.openedInfoWindow = infoWindow;
            infoWindow.open(that.mapsCtrl.map, that.markerCtrl.marker);
          });
        });
      };
    }
  });
