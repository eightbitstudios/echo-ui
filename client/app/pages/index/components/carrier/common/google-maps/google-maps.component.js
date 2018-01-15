'use strict';

angular.module('echo.components.googleMaps', [
  'echo.services.googleMapsApi',
  'echo.config.appConstants',
  'echo.components.googleMaps.constants.styles',
  'echo.config.mapConstants'
]).component('googleMaps', {
  bindings: {
    center: '<',
    totalPoints: '<',
    popupOffset: '<',
    map: '=?',
    fullscreen: '<',
    isDetails: '<'
  },
  transclude: true,
  template: '<div ng-transclude></div>',
  controller: function ($element, googleMapsApi, appConstants, googleMapsStyles, mapConstants) {

    var that = this;

    that.$onInit = function () {

      var defaultZoom = that.totalPoints === 1 ?
        appConstants.DEFAULT_MAP_ZOOM.ONE_POINT : appConstants.DEFAULT_MAP_ZOOM.OTHER;

      that.currentOpenPopover = null;

      if (that.isDetails) {
        var runtimeConfig = {
          center: this.center,
          zoom: defaultZoom,
          styles: mapConstants.STYLES
        };

        that.mapConfig = angular.extend({}, mapConstants.LARGE_MAP_CONFIG, runtimeConfig);

        googleMapsApi.then(
          function (google) {
            that.map = new google.maps.Map($element[0], that.mapConfig);
            that.bounds = new google.maps.LatLngBounds();
          },
          function(error) {
            console.warn('error loading google maps component', error);
          }
        );
      }
      else {
        googleMapsApi.then(function (google) {
          that.map = new google.maps.Map($element[0], {
            center: that.center,
            zoom: defaultZoom,
            styles: googleMapsStyles,
            clickableIcons: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            minZoom: 3,
            scrollwheel: !!that.fullscreen,
            disableDoubleClickZoom: false
          });
          that.bounds = new google.maps.LatLngBounds();
        });
      }
    };
  }
});
