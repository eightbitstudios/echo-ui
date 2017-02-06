describe('Model: location', function () {
  'use strict';

  var LocationModel;

  beforeEach(function () {
    module('echo.models.location');
    inject(function (_LocationModel_) {
      LocationModel = _LocationModel_;
    });
  });

  describe('Function: setLocation', function () {
    it('should set city and state property', function () {
      var location = new LocationModel();
      location.setLocation('Chicago, IL');
      expect(location.cityName).toEqual('Chicago');
      expect(location.stateCode).toEqual('IL');
    });
  });

  describe('Function: getLocationString', function () {
    it('should return formatted city state', function () {
      var location = new LocationModel({
        cityName: 'Chicago',
        stateCode: 'IL'
      });
      expect(location.getLocationString()).toEqual('Chicago, IL');
    });
    
    it('should return empty string', function () {
      var location = new LocationModel();
      expect(location.getLocationString()).toEqual('');
    });
  });

  describe('Function: isValid', function () {
    it('should be invalid if city is empty', function () {
      var location = new LocationModel({
        stateCode: 'IL'
      });
      expect(location.isValid()).toBeFalsy();
    });
    
    it('should be invalid if state is empty', function () {
      var location = new LocationModel({
        cityName: 'Chicago'
      });
      expect(location.isValid()).toBeFalsy();
    });
        
    it('should be valid if state, country code, and city are not empty', function () {
      var location = new LocationModel({
        cityName: 'Chicago',
        stateCode: 'IL',
        countryCD: 'US'
      });
      expect(location.isValid()).toBeTruthy();
    });
  });
});
