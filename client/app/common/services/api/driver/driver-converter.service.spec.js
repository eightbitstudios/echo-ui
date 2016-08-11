describe('Api: carrierApi', function () {
  'use strict';

  var $scope,
    driverConverterService;

  beforeEach(function () {

    module('echo.services.driverConverter');

    inject(function ($rootScope, _driverConverterService_) {
      $scope = $rootScope.$new();
      driverConverterService = _driverConverterService_;
    });
  });

  describe('Function: driverRequest', function () {
    it('should omit properties that are not needed for request', function () {
      var driver = {
        id: 1,
        phone: '12312412312',
        role: 'CarrierAdmin'
      },
      carrierId = 2;

      expect(driverConverterService.driverRequest(driver, carrierId)).toEqual({
        id: driver.id,
        carrierId: carrierId,
        phoneNumber: '1' + driver.phone
      });
    });
    
    it('should move other language property to language', function () {
      var driver = {
        id: 1,
        otherLanguage: 'German',
        phone: '12312412312'
      },
      carrierId = 2;

      expect(driverConverterService.driverRequest(driver, carrierId)).toEqual({
        id: driver.id,
        carrierId: carrierId,
        phoneNumber: '1' + driver.phone,
        language:  driver.otherLanguage
      });
    });
  });
});
