describe('Service: userProfile', function () {
  'use strict';

  var $base64,
    UserModel,
    userProfileService;

  beforeEach(function () {
    module('echo.services.userProfile', function ($provide) {
      $provide.value('$base64', $base64 = jasmine.createSpyObj('$base64', ['decode']));
      $provide.value('UserModel', UserModel = jasmine.createSpy('UserModel'));
    });

    spyOn(JSON, 'parse');

    inject(function (_userProfileService_) {
      userProfileService = _userProfileService_;
    });
  });

  describe('Function: mapJwtToUser', function() {
    it('should map user', function() {
      var user = {
        userId: 1,
        carrierId: 2
      };
      $base64.decode.and.returnValue();
      JSON.parse.and.returnValue(user);
      UserModel.and.returnValue(user);
      expect(userProfileService.mapJwtToUser()).toEqual(user);
    });
    
    it('should map userId', function() {
      var user = {
        userId: 1
      };
      $base64.decode.and.returnValue();
      JSON.parse.and.returnValue(user);
      UserModel.and.returnValue(user);
      expect(userProfileService.mapJwtToUser().userId).toBe(user.userId);
    });
        
    it('should map carrierId', function() {
      var user = {
        carrierId: 1
      };
      $base64.decode.and.returnValue();
      JSON.parse.and.returnValue(user);
      UserModel.and.returnValue(user);
      expect(userProfileService.mapJwtToUser().carrierId).toBe(user.carrierId);
    });
  });
});
