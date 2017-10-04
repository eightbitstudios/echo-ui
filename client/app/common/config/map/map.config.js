angular.module('echo.config.mapConstants', [])
.constant('mapConstants', {
  'MAP_TYPE': {
    'SMALL': 'SMALL',
    'LARGE': 'LARGE'
  },
  'MAP_POINT_TYPE': {
    'COMPLETE': 'COMPLETE',
    'DESTINATION': 'DESTINATION',
    'INCOMPLETE': 'INCOMPLETE',
    'ORIGIN': 'ORIGIN',
    'TRACK_AND_TRACE': 'TRACK_AND_TRACE',
    'CURRENT_LOCATION': 'CURRENT_LOCATION'
  },
  'MAP_POINT_TYPE_ICON': {
    'ORIGIN': '/assets/images/icon-gm-origin-marker.png',
    'DESTINATION': '/assets/images/icon-gm-destination-marker.png',
    'TRACK_AND_TRACE': '/assets/images/icon-gm-track-n-trace-marker.png',
    'INCOMPLETE': '/assets/images/icon-gm-incomplete-marker.png',
    'COMPLETE': '/assets/images/icon-gm-origin-marker.png',
    'CURRENT_LOCATION': '/assets/images/icon-gm-marker.png'
  },
  'DEFAULT_MAP_ZOOM': {
    'ONE_POINT': 15,
    'OTHER': 4
  },
  'DEFAULT_MAP_CENTER': {
    'lat': 39.50,
    'lng': -98.35
  },

 'SMALL_MAP_CONFIG': {
    'zoomControl': false,
    'mapTypeControl': false,
    'scaleControl': false,
    'streetViewControl': false,
    'rotateControl': false,
    'fullscreenControl': false,
    'scrollwheel': false,
    'gestureHandling': 'none',
    'clickableIcons': false,
    'keyboardShortcuts': false,
    'disableDoubleClickZoom': true
 },
  'LARGE_MAP_CONFIG': {
    'zoomControl': true,
    'mapTypeControl': false,
    'scaleControl': false,
    'streetViewControl': false,
    'rotateControl': false,
    'fullscreenControl': false,
    'scrollwheel': true,
    'gestureHandling': 'auto',
    'clickableIcons': true,
    'keyboardShortcuts': false,
    'disableDoubleClickZoom': false
  },

  'STYLES': [
    { 'elementType': 'geometry', 'stylers': [{ 'color': '#f5f5f5' }] },
    { 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#616161' }] },
    { 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#f5f5f5' }] },
    { 'featureType': 'administrative.land_parcel', 'elementType': 'labels', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'administrative.land_parcel', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#bdbdbd' }] },
    { 'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{ 'color': '#eeeeee' }] },
    { 'featureType': 'poi', 'elementType': 'labels.text', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'poi', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#757575' }] },
    { 'featureType': 'poi.business', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{ 'color': '#e5e5e5' }] },
    { 'featureType': 'poi.park', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#9e9e9e' }] },
    { 'featureType': 'road', 'elementType': 'geometry', 'stylers': [{ 'color': '#dadada' }] },
    { 'featureType': 'road', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'road.arterial', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#757575' }] },
    { 'featureType': 'road.highway', 'elementType': 'geometry', 'stylers': [{ 'color': '#dadada' }] },
    { 'featureType': 'road.highway', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#616161' }] },
    { 'featureType': 'road.local', 'elementType': 'labels', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'road.local', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#9e9e9e' }] },
    { 'featureType': 'transit', 'stylers': [{ 'visibility': 'off' }] },
    { 'featureType': 'transit.line', 'elementType': 'geometry', 'stylers': [{ 'color': '#e5e5e5' }] },
    { 'featureType': 'transit.station', 'elementType': 'geometry', 'stylers': [{ 'color': '#eeeeee' }] },
    { 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'color': '#b9f0ff' }] },
    { 'featureType': 'water', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#9e9e9e' }] },
    { 'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#dddddd' }, { 'weight': 1 }] }
  ]


});
