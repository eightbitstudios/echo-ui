
'use strict';

angular.module('echo.components.googleMapsMarker', [
  'echo.services.googleMapsApi',
  'echo.config.assetConfig'
]).component('googleMapsMarker', {
  require: {
    mapsCtrl: '^googleMaps'
  },
  bindings: {
    position: '<'
  },
  controller: function (googleMapsApi, assetConfig) {
    var that = this;

    that.$onInit = function () {
      googleMapsApi.then(function (google) {
        that.marker = new google.maps.Marker({
          position: that.position,
          icon: {
            url: assetConfig.ICON_GOOGLE_MAPS_MARKER_URL,
            anchor: new google.maps.Point(22,22)
          },
          map: that.mapsCtrl.map
        });
        that.mapsCtrl.bounds.extend(that.position);
        that.mapsCtrl.map.fitBounds(that.mapsCtrl.bounds);
      });
    };
  }
});
