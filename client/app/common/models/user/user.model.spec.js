describe('Model: user', function () {
  'use strict';

  var UserModel,
    roleConstants;

  beforeEach(function () {
    module('echo.models.user');
    inject(function (_UserModel_, _roleConstants_) {
      UserModel = _UserModel_;
      roleConstants = _roleConstants_;
    });
  });

  describe('Function: isRepAdmin', function () {
    it('should be a rep admin', function () {
      var user = new UserModel({
        oneLoginRoleName: roleConstants.ECHO_REP
      });

      expect(user.isRepAdmin()).toBeTruthy();
    });
    it('should not be a rep admin', function () {
      var user = new UserModel({
        oneLoginRoleName: roleConstants.CARRIER_ADMIN
      });

      expect(user.isRepAdmin()).toBeFalsy();
    });
  });

  describe('Function: isCarrierAdmin', function () {
    it('should be a carrier admin', function () {
      var user = new UserModel({
        oneLoginRoleName: roleConstants.CARRIER_ADMIN
      });

      expect(user.isCarrierAdmin()).toBeTruthy();
    });
    it('should not be a carrier admin', function () {
      var user = new UserModel({
        oneLoginRoleName: roleConstants.ECHO_REP
      });

      expect(user.isCarrierAdmin()).toBeFalsy();
    });
  });

  describe('Function: getRoleName', function () {
    it('should return role name', function () {
      var user = new UserModel({
        oneLoginRoleName: roleConstants.CARRIER_ADMIN
      });

      expect(user.getRoleName()).toEqual('Carrier Admin');
    });
  });
});
