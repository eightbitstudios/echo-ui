'use strict';

angular.module('echo.components.googleMapsLoadDetails', [
  'echo.services.googleMapsApi',
  'echo.config.appConstants'
]).component('googleMapsLoadDetails', {
  bindings: {
    center: '<',
    mapType: '<',
    totalPoints: '<',
    popupOffset: '<'
  },
  transclude: true,
  template: '<div ng-transclude></div>',
  controller: function ($element, googleMapsApi, mapConstants) {

    this.$onInit = function () {

      var defaultZoom = this.totalPoints === 1 ? mapConstants.DEFAULT_MAP_ZOOM.ONE_POINT : mapConstants.DEFAULT_MAP_ZOOM.OTHER;

      this.currentOpenPopover = null;

      var runtimeConfig = {
        center: this.center,
        zoom: defaultZoom,
        styles: mapConstants.STYLES
      };

      this.mapConfig = (this.mapType === mapConstants.MAP_TYPE.SMALL) ?
          angular.extend({}, mapConstants.SMALL_MAP_CONFIG, runtimeConfig) :
          angular.extend({}, mapConstants.LARGE_MAP_CONFIG, runtimeConfig);

      var that = this;

      googleMapsApi.then(
        function (google) {
          that.map = new google.maps.Map($element[0], that.mapConfig);
          that.bounds = new google.maps.LatLngBounds();
        },
        function(error) {
          console.warn('error loading google maps component', error);
        }
      );
    };
  }
});
