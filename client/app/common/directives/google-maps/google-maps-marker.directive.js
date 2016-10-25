
'use strict';

angular.module('echo.directives.googleMapsMarker', [
  'echo.config.globals'
]).component('googleMapsMarker', {
  require: {
    mapsCtrl: '^googleMaps'
  },
  bindings: {
    lat: '<',
    lng: '<'
  },
  controller: function (google) {
    var that = this;

    that.$onInit = function () {
      this.marker = new google.maps.Marker({
        position: { lat: this.lat, lng: this.lng },
        map: this.mapsCtrl.map
      });
    };
  }
});
