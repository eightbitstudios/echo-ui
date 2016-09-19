describe('Model: passwordChangeModel', function () {
  'use strict';

  var PasswordChangeModel;

  beforeEach(function () {
    module('echo.models.passwordChange');
    inject(function (_PasswordChangeModel_) {
      PasswordChangeModel = _PasswordChangeModel_;
    });
  });

  describe('Function: isValidLength', function () {
    it('should be invalid if a password is not provided', function () {
      var password = new PasswordChangeModel();

      expect(password.isValidLength()).toBeFalsy();
    });
    it('should be a valid if password is more than 8 characters', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'testing123';

      expect(password.isValidLength()).toBeTruthy();
    });
    it('should be invalid if password is less than 8 characters', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'test';

      expect(password.isValidLength()).toBeFalsy();
    });
  });

  describe('Function: hasLowerCase', function () {
    it('should be invalid if a password is not provided', function () {
      var password = new PasswordChangeModel();

      expect(password.hasLowerCase()).toBeFalsy();
    });
    it('should be a valid if password contains a lower case letter', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'test';

      expect(password.hasLowerCase()).toBeTruthy();
    });
    it('should be invalid if password does not contain a lower case letter', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'TEST';

      expect(password.hasLowerCase()).toBeFalsy();
    });
  });

  describe('Function: hasNumber', function () {
    it('should be invalid if a password is not provided', function () {
      var password = new PasswordChangeModel();

      expect(password.hasNumber()).toBeFalsy();
    });
    it('should be a valid if password contains a number', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'test123';

      expect(password.hasNumber()).toBeTruthy();
    });
    it('should be invalid if password does not contain a number', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'TEST';

      expect(password.hasNumber()).toBeFalsy();
    });
  });

  describe('Function: hasUpperCase', function () {
    it('should be invalid if a password is not provided', function () {
      var password = new PasswordChangeModel();

      expect(password.hasUpperCase()).toBeFalsy();
    });
    it('should be a valid if password contains an upper case letter', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'Test123';

      expect(password.hasUpperCase()).toBeTruthy();
    });
    it('should be invalid if password does not contain an upper case letter', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'test123';

      expect(password.hasUpperCase()).toBeFalsy();
    });
  });

  describe('Function: confirmPasswordMatches', function () {
    it('should be invalid if a password is not provided', function () {
      var password = new PasswordChangeModel();

      expect(password.confirmPasswordMatches()).toBeFalsy();
    });
    it('should be a valid if password contains an upper case letter', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'Test123';
      password.confirmPassword = 'Test123';

      expect(password.confirmPasswordMatches()).toBeTruthy();
    });
    it('should be invalid if password does not contain an upper case letter', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'test123';
      password.confirmPassword = 'test1234';

      expect(password.confirmPasswordMatches()).toBeFalsy();
    });
  });

  describe('Function: isValidPassword', function () {
    it('should be not be valid with a length less than 8', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'abcd';
      expect(password.isValidPassword()).toBeFalsy();
    });

    it('should not be valid without a lower case letter', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'ABCDEFGH1';
      expect(password.isValidPassword()).toBeFalsy();
    });
    
    it('should not be valid without an upper case letter', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'abcdefgh1';
      expect(password.isValidPassword()).toBeFalsy();
    });
        
    it('should be valid if both passwords match', function () {
      var password = new PasswordChangeModel();
      password.newPassword = 'Abcdefgh1';
      password.confirmPassword = 'Abcdefgh1';
      expect(password.isValidPassword()).toBeTruthy();
    });
  });
});
