'use strict';

angular.module('echo.directives.googleMaps', [
  'echo.config.globals'
]).component('googleMaps', {
  bindings: {
    lat: '<',
    lng: '<',
    zoom: '<'
  },
  transclude: true,
  template: '<div class="map"></div><ng-transclude></ng-transclude>',
  controller: function ($element, google) {
    this.map = new google.maps.Map($element.find('.map')[0], {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.zoom,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false
    });
  }
});
