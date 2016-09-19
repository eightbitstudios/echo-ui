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

    inject(function (_userProfileService_) {
      userProfileService = _userProfileService_;
    });
  });

  describe('Function: getUser', function() {
    it('should get user', function() {
      userProfileService._user = {id: 1};
      expect(userProfileService.getUser()).toEqual(userProfileService._user);
    });
  });

  describe('Function: setUser', function() {
    it('should set user', function() {
      var user = {id: 2};
      UserModel.and.returnValue(user);
      userProfileService.setUser(user);
      expect(userProfileService._user).toEqual(user);
    });
  });
});
