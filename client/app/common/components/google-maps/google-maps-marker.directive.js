
'use strict';

angular.module('echo.components.googleMapsMarker', [
  'echo.services.googleMapsApi'
]).component('googleMapsMarker', {
  require: {
    mapsCtrl: '^googleMaps'
  },
  bindings: {
    position: '<'
  },
  controller: function (googleMapsApi) {
    var that = this;

    that.$onInit = function () {
      googleMapsApi.then(function (google) {
        that.marker = new google.maps.Marker({
          position: that.position,
          icon: {
            url: '/assets/images/icon-gm-marker.png',
            anchor: new google.maps.Point(22,22)
          },
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
