'use strict';

angular.module('echo.components.googleMaps', [
  'echo.services.googleMapsApi'
]).component('googleMaps', {
  bindings: {
    center: '<',
    totalPoints: '<',
    popupOffset: '<'
  },
  transclude: true,
  template: '<div class="map"><ng-transclude></ng-transclude></div>',
  controller: function ($element, googleMapsApi) {

    var that = this;

    that.$onInit = function () {
      var defaultZoom = 4;
      if (that.totalPoints === 1) {
        defaultZoom = 15;
      }


      var styles = [
        {'elementType': 'geometry', 'stylers': [{'color': '#f5f5f5'}]},
        {'elementType': 'labels.text.fill', 'stylers': [{'color': '#616161'}]},
        {'elementType': 'labels.text.stroke', 'stylers': [{'color': '#f5f5f5'}]},
        {'featureType': 'administrative.land_parcel', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}]},
        {'featureType': 'administrative.land_parcel', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#bdbdbd'}]},
        {'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{'color': '#eeeeee'}]},
        {'featureType': 'poi', 'elementType': 'labels.text', 'stylers': [{'visibility': 'off'}]},
        {'featureType': 'poi', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#757575'}]},
        {'featureType': 'poi.business', 'stylers': [{'visibility': 'off'}]},
        {'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{'color': '#e5e5e5'}]},
        {'featureType': 'poi.park', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#9e9e9e'}]},
        {'featureType': 'road', 'elementType': 'geometry', 'stylers': [{'color': '#dadada'}]},
        {'featureType': 'road', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]},
        {'featureType': 'road.arterial', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#757575'}]},
        {'featureType': 'road.highway', 'elementType': 'geometry', 'stylers': [{'color': '#dadada'}]},
        {'featureType': 'road.highway', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#616161'}]},
        {'featureType': 'road.local', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}]},
        {'featureType': 'road.local', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#9e9e9e'}]},
        {'featureType': 'transit', 'stylers': [{'visibility': 'off'}]},
        {'featureType': 'transit.line', 'elementType': 'geometry', 'stylers': [{'color': '#e5e5e5'}]},
        {'featureType': 'transit.station', 'elementType': 'geometry', 'stylers': [{'color': '#eeeeee'}]},
        {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#b9f0ff'}]},
        {'featureType': 'water', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#9e9e9e'}]}
      ];

      googleMapsApi.then(function (google) {
        that.map = new google.maps.Map($element.find('.map')[0], {
          center: that.center,
          zoom: defaultZoom,
          styles: styles,
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
