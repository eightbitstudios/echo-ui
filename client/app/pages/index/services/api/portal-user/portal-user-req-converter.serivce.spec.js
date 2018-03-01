describe('Service: portalUserReqConverterService', function() {
  'use strict';

  var portalUserReqConverterService;

  beforeEach(function() {
    module('echo.services.portalUserReqConverter');

    inject(function(_portalUserReqConverterService_) {
      portalUserReqConverterService = _portalUserReqConverterService_;
    });
  });

  describe('Function: convertPortalUser', function() {
    it('should format users phone number', function() {
      var user = {
        id: 1,
        email: 'test@gmail.com',
        firstName: 'Test',
        lastName: 'Test',
        carrierId: 23,
        phone: '2875555555'
      };

      var convertedUser = portalUserReqConverterService.convertPortalUser(user);

      expect(convertedUser).toEqual({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: '1' + user.phone,
        carrierId: user.carrierId
      });
    });

    it('should not format users phone number', function() {
      var user = {
        id: 1,
        email: 'test@gmail.com',
        firstName: 'Test',
        lastName: 'Test',
        carrierId: 23
      };

      var convertedUser = portalUserReqConverterService.convertPortalUser(user);

      expect(convertedUser).toEqual({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: undefined,
        carrierId: user.carrierId
      });
    });
  });
});