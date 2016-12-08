'use strict';

angular.module('echo.components.googleMaps', [
  'echo.services.googleMapsApi',
  'echo.config.appConstants',
  'echo.components.googleMaps.constants.styles'
]).component('googleMaps', {
  bindings: {
    center: '<',
    totalPoints: '<',
    popupOffset: '<',
    map: '='
  },
  transclude: true,
  template: '<div ng-transclude></div>',
  controller: function ($element, googleMapsApi, appConstants, googleMapsStyles) {

    var that = this;

    that.$onInit = function () {

      var defaultZoom = that.totalPoints === 1 ?
        appConstants.DEFAULT_MAP_ZOOM.ONE_POINT : appConstants.DEFAULT_MAP_ZOOM.OTHER;

      that.currentOpenPopover = null;

      googleMapsApi.then(function (google) {
        that.map = new google.maps.Map($element[0], {
          center: that.center,
          zoom: defaultZoom,
          styles: googleMapsStyles,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true
        });
        that.bounds = new google.maps.LatLngBounds();
      });
    };
  }
});
