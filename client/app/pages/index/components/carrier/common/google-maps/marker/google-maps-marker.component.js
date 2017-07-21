
'use strict';

angular.module('echo.components.googleMapsMarker', [
  'echo.services.googleMapsApi',
  'echo.config.assetConfig'
]).component('googleMapsMarker', {
  require: {
    mapsCtrl: '^googleMaps'
  },
  bindings: {
    position: '<',
    numberOfLoads: '<'
  },
  controller: function (googleMapsApi, assetConfig) {
    var that = this;

    that.$onInit = function () {
      googleMapsApi.then(function (google) {
        var label = null,
          icon = {
            url: assetConfig.ICON_GOOGLE_MAPS_MARKER_URL,
            anchor: new google.maps.Point(22, 22)
          };

        if (that.numberOfLoads > 1) {
          label = {
            text: _.toString(that.numberOfLoads),
            color: 'white',
            fontSize: '18px'
          };
          icon.url = assetConfig.ICON_GOOGLE_MAPS_MULTIPLE_MARKER_URL;
          icon.scaledSize = new google.maps.Size(45, 45);
        }

        that.marker = new google.maps.Marker({
          position: that.position,
          icon: icon,
          label: label,
          map: that.mapsCtrl.map
        });
        that.mapsCtrl.bounds.extend(that.position);
        if (that.mapsCtrl.totalPoints !== 1) {
          that.mapsCtrl.map.fitBounds(that.mapsCtrl.bounds);
        }
      });
    };
  }
});
