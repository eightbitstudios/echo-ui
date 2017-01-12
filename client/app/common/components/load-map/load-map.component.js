angular.module('echo.components.loadMap', [
    'echo.services.googleMapsApi',
    'echo.services.googleMaps',
    'echo.components.googleMaps',
    'echo.components.googleMapsMarker',
    'echo.components.googleMapsInfoWindow',
    'echo.components.loadMap.detailedInfoWindow',
    'echo.components.loadMap.basicInfoWindow',
    'echo.components.loading'
  ])
  .constant('googleMapsConst', {
    detailedInfoOffset: {
      x: 230,
      y: 262
    },
    defaultOffset: {
      x: 175,
      y: 125
    }
  })
  .component('loadMap', {
    templateUrl: 'app/common/components/load-map/load-map.template.html',
    bindings: {
      mapPoints: '=',
      detailedInfo: '<',
      showMap: '<'
    },
    controller: function($q, googleMapsApi, googleMaps, googleMapsConst) {

      this.formatMapPoints = function(google) {
        var that = this;

        var geocoder = new google.maps.Geocoder();
        var promises = [];
        _.forEach(that.mapPoints, function(mapPoint) {
          promises.push(googleMaps.appendPosition(geocoder, mapPoint));
        });

        if (_.size(promises) === 0) {
          that.mapCenter = googleMaps.findCenter(that.google, that.mapPoints);
          return that.mapCenter;
        } else {
          return $q.all(promises).then(function() {
            that.mapPoints = _.filter(that.mapPoints, function(mapPoint) {
              return !!mapPoint.position;
            });
            that.mapCenter = googleMaps.findCenter(that.google, that.mapPoints);
          });
        }
      };

      this.$onChanges = function(changeObj) {
        var that = this;

        if (changeObj.showMap.currentValue) {
          googleMapsApi.then(function(google) {
            that.google = google;
            return that.formatMapPoints(google);
          }).finally(function() {
            that.showLoading = false;
          });
        } else {
          that.showLoading = true;
        }
      };

      this.$onInit = function() {
        this.popupOffset = this.detailedInfo ? googleMapsConst.detailedInfoOffset : googleMapsConst.defaultOffset;
      };
    }
  });