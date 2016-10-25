'use strict';

angular.module('echo.directives.googleMaps', [
  'echo.services.googleMapsApi'
]).component('googleMaps', {
  bindings: {
    lat: '<',
    lng: '<',
    zoom: '<'
  },
  transclude: true,
  template: '<div class="map"><ng-transclude></ng-transclude></div>',
  controller: function ($element, googleMapsApi) {

    var that = this;

    that.$onInit = function () {
      googleMapsApi.then(function (google) {
        that.map = new google.maps.Map($element.find('.map')[0], {
          center: { lat: that.lat, lng: that.lng },
          zoom: that.zoom,
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false
        });
      });
    };
  }
});
