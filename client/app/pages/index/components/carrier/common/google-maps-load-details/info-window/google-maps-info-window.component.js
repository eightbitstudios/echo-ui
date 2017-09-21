'use strict';

angular.module('echo.components.googleMapsInfoWindowLoadDetails', [
  'echo.services.googleMapsApi'
])
  .component('googleMapsInfoWindowLoadDetails', {
    require: {
      mapsCtrl: '^googleMapsLoadDetails',
      markerCtrl: '^googleMapsMarkerLoadDetails'
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
          that.markerCtrl.marker.addListener('click', function () {

            if(that.mapsCtrl.currentOpenPopover){
              that.mapsCtrl.currentOpenPopover.close();
            }

            that.mapsCtrl.currentOpenPopover = infoWindow;
            infoWindow.open(that.mapsCtrl.map, that.markerCtrl.marker);

            google.maps.event.addListener(that.mapsCtrl.map, 'click', function() {
              infoWindow.close();
            });
          });
        },
          function(error) {
            console.warn('error loading google maps component', error);
          });
      };
    }
  });

