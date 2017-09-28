'use strict';

angular.module('echo.components.googleMapsInfoWindow', [
  'echo.services.googleMapsApi'
])
  .component('googleMapsInfoWindow', {
    require: {
      mapsCtrl: '^googleMaps',
      markerCtrl: '^googleMapsMarker'
    },
    bindings: {
      isDetails: '<' //is load details or dashboard map
    },
    transclude: true,
    template: '<div ng-transclude></div>',
    controller: function ($element, googleMapsApi) {

      var that = this;

      that.$onInit = function () {
        googleMapsApi.then(function (google) {
          var infoWindow = new google.maps.InfoWindow({
            content: $element[0]
          });
          if (!that.isDetails){
            infoWindow.pixelOffset = new google.maps.Size(that.mapsCtrl.popupOffset.x, that.mapsCtrl.popupOffset.y);
          }

          that.markerCtrl.marker.addListener('click', function () {

            if(that.mapsCtrl.currentOpenPopover){
              that.mapsCtrl.currentOpenPopover.close();
            }

            that.mapsCtrl.currentOpenPopover = infoWindow;
            infoWindow.open(that.mapsCtrl.map, that.markerCtrl.marker);

            if (that.isDetails) {
              google.maps.event.addListener(that.mapsCtrl.map, 'click', function() {
                infoWindow.close();
              });
            }
          });
        });
      };
    }
  });
