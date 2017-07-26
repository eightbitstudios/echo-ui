'use strict';

angular.module('echo.services.googleMaps', [
  'echo.config.appConstants'
])
  .factory('googleMaps', function ($q, appConstants) {
    return {
      appendPosition: function (geocoder, mapPoint) {
        var deferred = $q.defer();
        geocoder.geocode({'address': _.template('${city}, ${state}')({ city: _.get(mapPoint.currentLocation, 'cityName'), state: _.get(mapPoint.currentLocation, 'stateCode')})}, function (results, status) {
          if (status === 'OK') {
            mapPoint.position = results[0].geometry.location;
          }
          deferred.resolve();
        });
        return deferred.promise;
      },

      findCenter: function (google, mapPoints) {
        var useDefault = true;
        var bounds = new google.maps.LatLngBounds();
        _.forEach(mapPoints, function(mapPoint) {
          if (mapPoint.position) {
            bounds.extend(mapPoint.position);
            useDefault = false;
          }
        });

        if (useDefault) {
          return new google.maps.LatLng(appConstants.DEFAULT_MAP_CENTER.lat, appConstants.DEFAULT_MAP_CENTER.lng);
        } else {
          return bounds.getCenter();
        }
      },

      resizeAndCenter: function (google, map, mapPoints) {
        if (map) {
          google.maps.event.trigger(map, 'resize');

          var bounds = new google.maps.LatLngBounds();
          _.forEach(mapPoints, function (mapPoint) {
            if (mapPoint.position) {
              bounds.extend(mapPoint.position);
            }
          });

          map.fitBounds(bounds);
          map.setCenter(this.findCenter(google, mapPoints));
        }
      },

      getDefaultZoom: function (mapPoints) {
        var validPoints = 0;
        _.forEach(mapPoints, function(mapPoint) {
          if (mapPoint.position) {
            validPoints++;
          }
        });

        if (validPoints === 1) {
          return appConstants.DEFAULT_MAP_ZOOM.ONE_POINT;
        } else {
          return appConstants.DEFAULT_MAP_ZOOM.OTHER;
        }
      },

      formatMapPoints: function (google, geocoder, mapPoints) {
        var that = this;
        var promises = [];
        _.forEach(mapPoints, function (mapPoint) {
          promises.push(that.appendPosition(geocoder, mapPoint));
        });

        if (_.size(promises) === 0) {
          return $q.when(that.findCenter(google, mapPoints));
        } else {
          return $q.all(promises).then(function () {
            mapPoints = _.filter(mapPoints, function (mapPoint) { return !!mapPoint.position; });
            return that.findCenter(google, mapPoints);
          });
        }
      },

      getMapsUrlByCityState: function (address, city, state) {
        var urlTemplate =  _.template(appConstants.GOOGLE_MAPS_HOST_URL + '?q=${address},+${city},+${state}');
        return urlTemplate({ 'address': address, 'city': city, 'state': state });
      }
    };
  });