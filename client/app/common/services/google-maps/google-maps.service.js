'use strict';

angular.module('echo.services.googleMaps', [])
  .factory('googleMaps', function ($q) {
    return {
      appendPosition: function (geocoder, mapPoint) {
        var deferred = $q.defer();
        geocoder.geocode({'address': _.get(mapPoint.currentLocation, 'city') + ', ' + _.get(mapPoint.currentLocation, 'state')}, function (results, status) {
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
          return new google.maps.LatLng(39.50, -98.35);
        } else {
          return bounds.getCenter();
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
          return 15;
        } else {
          return 4;
        }
      }
    };
  });
