'use strict';

angular.module('echo.services.googleMaps', [
  'echo.config.appConstants'
])
  .factory('googleMaps', function ($q, appConstants) {
    return {
      appendPosition: function (geocoder, mapPoint) {
        var deferred = $q.defer();
        geocoder.geocode({ 'address': _.template('${city}, ${state}')({ city: _.get(mapPoint.currentLocation, 'cityName'), state: _.get(mapPoint.currentLocation, 'stateCode') }) }, function (results, status) {
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
        _.forEach(mapPoints, function (mapPoint) {
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
        _.forEach(mapPoints, function (mapPoint) {
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

      buildMapPoints: function (mapPoints) {
        var points = [];

        _.forEach(mapPoints, function (load) {
          var index = _.findIndex(points, function (point) {
            return _.lowerCase(load.currentLocation.cityName) === _.lowerCase(point.currentLocation.cityName) &&
              _.lowerCase(load.currentLocation.stateCode) === _.lowerCase(point.currentLocation.stateCode);
          });

          if (index > -1) {
            points[index].loads.push(load);
          } else {
            points.push({
              currentLocation: load.currentLocation,
              loads: [
                load
              ]
            });
          }
        });

        return points;
      },

      formatMapPoints: function (google, geocoder, mapPoints) {
        var that = this;
        var formatMapPoints = that.buildMapPoints(mapPoints);

        var promises = _.map(formatMapPoints, function (mapPoint) {
          return that.appendPosition(geocoder, mapPoint);
        }) || [];

        if (_.size(promises) === 0) {
          return $q.when({
            center: that.findCenter(google, mapPoints),
            mapPoints: formatMapPoints
          });
        } else {
          return $q.all(promises).then(function () {
            formatMapPoints = _.filter(formatMapPoints, function (mapPoint) { return !!mapPoint.position; });
            return {
              center: that.findCenter(google, formatMapPoints),
              mapPoints: formatMapPoints
            };
          });
        }
      },

      getMapsUrlByCityState: function (address, city, state) {
        var urlTemplate = _.template(appConstants.GOOGLE_MAPS_HOST_URL + '?q=${address},+${city},+${state}');
        return urlTemplate({ 'address': address, 'city': city, 'state': state });
      }
    };
  });
