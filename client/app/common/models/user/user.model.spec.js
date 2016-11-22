describe('Model: user', function () {
  'use strict';

  var UserModel,
    RolesEnum;

  beforeEach(function () {
    module('echo.models.user');
    inject(function (_UserModel_, _RolesEnum_) {
      UserModel = _UserModel_;
      RolesEnum = _RolesEnum_;
    });
  });

  describe('Function: isRepAdmin', function () {
    it('should be a rep admin', function () {
      var user = new UserModel({
        oneLoginRoleName: RolesEnum.ECHO_REP
      });

      expect(user.isRepAdmin()).toBeTruthy();
    });
    it('should not be a rep admin', function () {
      var user = new UserModel({
        oneLoginRoleName: RolesEnum.CARRIER_ADMIN
      });

      expect(user.isRepAdmin()).toBeFalsy();
    });
  });

  describe('Function: isCarrierAdmin', function () {
    it('should be a carrier admin', function () {
      var user = new UserModel({
        oneLoginRoleName: RolesEnum.CARRIER_ADMIN
      });

      expect(user.isCarrierAdmin()).toBeTruthy();
    });
    it('should not be a carrier admin', function () {
      var user = new UserModel({
        oneLoginRoleName: RolesEnum.ECHO_REP
      });

      expect(user.isCarrierAdmin()).toBeFalsy();
    });
  });

  describe('Function: getRoleName', function () {
    it('should return role name', function () {
      var user = new UserModel({
        oneLoginRoleName: RolesEnum.CARRIER_ADMIN
      });

      expect(user.getRoleName()).toEqual('Carrier Admin');
    });
  });
});
