describe('Model: rep', function () {
  'use strict';

  var RepModel;

  beforeEach(function () {
    module('echo.models.rep');
    inject(function (_RepModel_) {
      RepModel = _RepModel_;
    });
  });

  describe('Function: getPhoneNumber', function () {
    it('should return phone number', function () {
      var phone = '123456789';
      var rep = new RepModel({
        phone: phone
      });
      expect(rep.getPhoneNumber()).toEqual(phone);
    });
  });
});
