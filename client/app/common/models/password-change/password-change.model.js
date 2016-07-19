angular.module('echo.models.passwordChange', [
  'echo.config.appConstants'
])
  .factory('PasswordChangeModel', function (appConstants) {

    /**
     * @constructor
     */
    function PasswordChange() {
      var that = this;

      that.newPassword = '';
      that.confirmPassword = '';
    }

    PasswordChange.prototype.isValidLength = function () {
      return !!(this.newPassword && appConstants.REGEX.passwordLength.test(this.newPassword));
    };

    PasswordChange.prototype.hasLowerCase = function () {
      return !!(this.newPassword &&
      appConstants.REGEX.passwordLowerCase.test(this.newPassword));
    };

    PasswordChange.prototype.hasNumber = function () {
      return !!(this.newPassword &&
      appConstants.REGEX.passwordNumber.test(this.newPassword));
    };

    PasswordChange.prototype.hasUpperCase = function () {
      return !!(this.newPassword && appConstants.REGEX.passwordUpperCase.test(this.newPassword));
    };

    PasswordChange.prototype.confirmPasswordMatches = function () {
      return !!(this.newPassword && this.confirmPassword && this.newPassword === this.confirmPassword);
    };

    PasswordChange.prototype.isValidPassword = function () {
      return !!(this.isValidLength() && this.hasNumber() &&  this.hasLowerCase() &&
      this.hasUpperCase() && this.confirmPasswordMatches());
    };

    /**
     * Return the constructor function
     */
    return PasswordChange;
  });
