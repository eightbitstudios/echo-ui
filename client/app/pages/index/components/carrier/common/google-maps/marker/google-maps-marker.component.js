
'use strict';

angular.module('echo.components.googleMapsMarker', [
  'echo.services.googleMapsApi',
  'echo.config.assetConfig',
  'echo.config.mapConstants'
]).component('googleMapsMarker', {
  require: {
    mapsCtrl: '^googleMaps'
  },
  bindings: {
    position: '<',
    numberOfLoads: '<',
    isDetails: '<',
    mapMarker: '<'
  },
  controller: function (googleMapsApi, assetConfig, mapConstants) {
    var that = this;

    that.$onInit = function () {
        googleMapsApi.then(
          function (google) {

            if (that.isDetails){
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
            }
            else {
              var label = null,
                icon = {
                  url: assetConfig.ICON_GOOGLE_MAPS_MARKER_URL,
                  anchor: new google.maps.Point(22, 22)
                };

              if (that.numberOfLoads > 1) {
                label = {
                  text: _.toString(that.numberOfLoads),
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold'
                };
                icon.url = assetConfig.ICON_GOOGLE_MAPS_MULTIPLE_MARKER_URL;
                icon.scaledSize = new google.maps.Size(35, 35);
              }

              that.marker = new google.maps.Marker({
                position: that.position,
                icon: icon,
                label: label,
                map: that.mapsCtrl.map
              });
              that.mapsCtrl.bounds.extend(that.position);
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
