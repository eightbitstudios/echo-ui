
'use strict';

angular.module('echo.components.googleMapsMarkerLoadDetails', [
  'echo.services.googleMapsApi'
]).component('googleMapsMarkerLoadDetails', {
  require: {
    mapsCtrl: '^googleMapsLoadDetails'
  },
  bindings: {
    mapMarker: '<'
  },
  controller: function ($timeout, mapConstants, googleMapsApi) { // jshint ignore:line
    var that = this;

    this.$onInit = function () {
      googleMapsApi.then(
        function (google) {

          that.marker = new google.maps.Marker({
            position: that.mapMarker.position,
            icon: {
              url: that.getMarkerUrl(that.mapMarker.getMapPointType()),
              anchor: that.getMarkerAnchor(that.mapMarker.getMapPointType())
            },
            map: that.mapsCtrl.map
          });

          if(that.mapMarker.position) {
            that.mapsCtrl.bounds.extend(that.mapMarker.position);
          }

          if (that.mapsCtrl.totalPoints !== 1) {
            that.mapsCtrl.map.fitBounds(that.mapsCtrl.bounds);
          }
      }, function(error) {
          console.warn('error loading google maps component', error);
        });
    };

    this.getMarkerUrl = function(markerType){
      return mapConstants.MAP_POINT_TYPE_ICON[markerType];
    };

    this.getMarkerAnchor = function(markerType){
      if(markerType === mapConstants.MAP_POINT_TYPE.CURRENT_LOCATION) {
        // Anchor the marker for current location to align it directly on top of the progress lines
        return new google.maps.Point(22, 22); // jshint ignore:line
      }
    };

  }

});
