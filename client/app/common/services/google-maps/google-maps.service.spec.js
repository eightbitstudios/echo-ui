describe('Service: googleMaps', function() {
  'use strict';

  var $scope,
    $q,
    appConstants,
    googleMaps;

  beforeEach(function() {
    module('echo.services.googleMaps');

    inject(function($rootScope, _$q_, _appConstants_, _googleMaps_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      googleMaps = _googleMaps_;
      appConstants = _appConstants_;
    });
  });

  describe('Function: appendPosition', function() {
    it('should return location if google api call is successful', function() {

      var results = [{
        geometry: {
          location: {
            lat: 30,
            lng: 50
          }
        }
      }];

      var geocoder = {
        geocode: function(address, callback) {
          callback(results, 'OK');
        }
      };
      var mapPoint = {
        currentLocation: {
          cityName: 'Chicago',
          stateCode: 'IL'
        }
      };

      googleMaps.appendPosition(geocoder, mapPoint);

      expect(mapPoint.position).toEqual(results[0].geometry.location);
    });

    it('should return location if google api call is successful', function() {

      var geocoder = {
        geocode: function(address, callback) {
          callback({}, 'ERROR');
        }
      };
      var mapPoint = {
        currentLocation: {
          cityName: 'Chicago',
          stateCode: 'IL'
        }
      };

      googleMaps.appendPosition(geocoder, mapPoint);

      expect(mapPoint.position).toBeUndefined();
    });
  });

  describe('Function: findCenter', function() {
    var google,
      bounds;

    beforeEach(function() {
      google = {
        maps: {
          LatLng: jasmine.createSpy('LatLng'),
          LatLngBounds: jasmine.createSpy('LatLngBounds')
        }
      };
      google.maps.LatLngBounds.and.returnValue(
        bounds = jasmine.createSpyObj('bounds', ['extend', 'getCenter']));
    });

    it('should use default bounds', function() {
      var mapPoints = [{}];
      googleMaps.findCenter(google, mapPoints);

      expect(google.maps.LatLng).toHaveBeenCalledWith(appConstants.DEFAULT_MAP_CENTER.lat, appConstants.DEFAULT_MAP_CENTER.lng);
    });
    it('should use default bounds', function() {
      var mapPoints = [{
        position: {
          lat: 30,
          lng: 40
        }
      }];

      googleMaps.findCenter(google, mapPoints);

      expect(bounds.getCenter).toHaveBeenCalled();
    });
  });

  describe('Function: getDefaultZoom', function() {

    it('should zoom on a single point', function() {
      var mapPoints = [{
        position: {
          lat: 30,
          lng: 40
        }
      }];

      expect(googleMaps.getDefaultZoom(mapPoints)).toEqual(appConstants.DEFAULT_MAP_ZOOM.ONE_POINT);
    });

    it('should zoom on a group of points', function() {
      var mapPoints = [{
        position: {
          lat: 30,
          lng: 40
        }
      }, {
        position: {
          lat: 45,
          lng: 60
        }
      }, {}];

      expect(googleMaps.getDefaultZoom(mapPoints)).toEqual(appConstants.DEFAULT_MAP_ZOOM.OTHER);
    });
  });
});