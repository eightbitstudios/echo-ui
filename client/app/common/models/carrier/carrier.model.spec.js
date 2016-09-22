describe('Model: carrier', function () {
  'use strict';

  var CarrierModel;

  beforeEach(function () {
    module('echo.models.carrier');
    inject(function (_CarrierModel_) {
      CarrierModel = _CarrierModel_;
    });
  });

  describe('Function: getId', function () {
    it('should return carrierId', function () {
      var carrierId = 1;
      var carrier = new CarrierModel({
        carrierId: carrierId
      });

      expect(carrier.getId()).toBe(carrierId);
    });
  });

  describe('Function: getName', function () {
    it('should return carrier name', function () {
      var carrierName = 'Test';
      var carrier = new CarrierModel({
        carrierName: carrierName
      });

      expect(carrier.getName()).toEqual(carrierName);
    });
  });

  describe('Function: isInactive', function () {
    it('should be inactive', function () {
      var carrier = new CarrierModel({
        userCount: 0
      });

      expect(carrier.isInactive()).toBeTruthy();
    });
    it('should be active', function () {
      var carrier = new CarrierModel({
        userCount: 1
      });

      expect(carrier.isInactive()).toBeFalsy();
    });
  });

  describe('Function: getFullAddress', function () {
    it('should be inactive', function () {
      var carrier = new CarrierModel({
        address1: '1234 Main',
        city: 'Chicago',
        state: 'IL.'
      });

      expect(carrier.getFullAddress()).toEqual('1234 Main, Chicago, IL. ');
    });
  });
});
