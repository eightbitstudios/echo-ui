angular.module('echo.components.loadMap', [
  'echo.services.googleMapsApi',
  'echo.services.googleMaps',
  'echo.components.googleMaps',
  'echo.components.googleMapsMarker',
  'echo.components.googleMapsInfoWindow',
  'echo.components.loadMap.detailedInfoWindow',
  'echo.components.loadMap.basicInfoWindow'
])
  .constant('googleMapsConst', {
    detailedInfoOffset: {
      x: 210,
      y: 255
    },
    defaultOffset: {
      x: 185,
      y: 125
    }
  })
  .component('loadMap', {
    templateUrl: 'app/common/components/load-map/load-map.template.html',
    bindings: {
      mapPoints: '<',
      detailedInfo: '<'
    },
    controller: function ($q, googleMapsApi, googleMaps, googleMapsConst) {
      var that = this;

      that.formatMapPoints = function (google) {
        var geocoder = new google.maps.Geocoder();
        var promises = [];
        _.forEach(that.mapPoints, function (mapPoint) {
          promises.push(googleMaps.appendPosition(geocoder, mapPoint));
        });
        $q.all(promises).then(function () {
          that.mapPoints = _.filter(that.mapPoints, function (mapPoint) { return !!mapPoint.position; });
          that.mapCenter = googleMaps.findCenter(that.google, that.mapPoints);
          that.showMap = true;
        });
      };

      that.popupOffset = that.detailedInfo ? googleMapsConst.detailedInfoOffset : googleMapsConst.defaultOffset;

      that.$onInit = function () {
        that.showMap = false;
        googleMapsApi.then(function (google) {
          that.google = google;
          that.formatMapPoints(google);
        });
      };
    }
  });
