
'use strict';

angular.module('echo.components.googleMapsMarker', [
  'echo.services.googleMapsApi'
]).component('googleMapsMarker', {
  require: {
    mapsCtrl: '^googleMaps'
  },
  bindings: {
    lat: '<',
    lng: '<'
  },
  controller: function (googleMapsApi) {
    var that = this;

    that.$onInit = function () {
      googleMapsApi.then(function (google) {
        that.marker = new google.maps.Marker({
          position: { lat: that.lat, lng: that.lng },
          map: that.mapsCtrl.map
        });
      });
    };
  }
});
