describe('Service: googleMaps', function() {
  'use strict';

  var scope,
    $q,
    appConstants,
    googleMaps;

  beforeEach(function() {
    module('echo.services.googleMaps');

    inject(function($rootScope, _$q_, _appConstants_, _googleMaps_) {
      scope = $rootScope.$new();
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

  describe('Function: resizeAndCenter', function () {

    var google,
      bounds;

    beforeEach(function() {
      google = {
        maps: {
          event: {
            trigger: function (map, trigger) {
              expect(trigger).toBe('resize');
            }
          },
          LatLng: jasmine.createSpy('LatLng'),
          LatLngBounds: jasmine.createSpy('LatLngBounds')
        }
      };
      google.maps.LatLngBounds.and.returnValue(
        bounds = jasmine.createSpyObj('bounds', ['extend', 'getCenter']));
    });

    it('should do nothing without a map object', function () {
      googleMaps.resizeAndCenter(google, undefined, []);

      expect(google.maps.LatLngBounds).not.toHaveBeenCalled();
    });

    it('should fit bounds and center the map', function () {
      var fitBoundsCalled = false;
      var setCenterCalled = false;
      var map = {
        fitBounds: function(boundsObj) { fitBoundsCalled = true; },
        setCenter: function(latLngObj) { setCenterCalled = true; }
      };
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
      }];

      googleMaps.resizeAndCenter(google, map, mapPoints);

      expect(fitBoundsCalled).toBe(true);
      expect(setCenterCalled).toBe(true);
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

  describe('Function: formatMapPoints', function () {

    var google,
      geocoder,
      bounds;
    var results = [{
      geometry: {
        location: {
          lat: 30,
          lng: 50
        }
      }
    }];

    beforeEach(function() {
      google = {
        maps: {
          event: {
            trigger: function (map, trigger) {
              expect(trigger).toBe('resize');
            }
          },
          LatLng: jasmine.createSpy('LatLng'),
          LatLngBounds: jasmine.createSpy('LatLngBounds')
        }
      };
      google.maps.LatLngBounds.and.returnValue(
        bounds = jasmine.createSpyObj('bounds', ['extend', 'getCenter']));
      geocoder = {
        geocode: function(address, callback) {
          callback(results, 'OK');
        }
      };
    });

    it('should return default center with 0 map points', function () {
      googleMaps.formatMapPoints(google, geocoder, []).then(function (result) {
        expect(google.maps.LatLng).toHaveBeenCalledWith(appConstants.DEFAULT_MAP_CENTER.lat, appConstants.DEFAULT_MAP_CENTER.lng);
      });

      scope.$digest();
    });

    it('should return center with multiple map points', function () {
      var mapPoints = [{
        currentLocation: {
          cityName: 'Chicago',
          stateCode: 'IL'
        }
      }, {
        currentLocation: {
          cityName: 'Houston',
          stateCode: 'TX'
        }
      }];

      var center = {
        lat: 30,
        lng: 50
      };

      bounds.getCenter.and.returnValue(center);

      googleMaps.formatMapPoints(google, geocoder, mapPoints).then(function (result) {
        expect(bounds.getCenter).toHaveBeenCalled();
        expect(result.center).toBe(center);
      });

      scope.$digest();
    });

  });
});
