angular.module('echo.models.driver', [
  'echo.config.appConstants'
])
  .factory('DriverModel', function (appConstants) {
    /**
     * @description Model for a User
     * @param {Object} userData - Data to be converted to a User Model
     * @param {string} [userData.id] - User Id
     * @param {number} [userData.carrierId] - Carrier associated to user
     * @constructor
     */
    function Driver(userData) {

      var that = this;

      var defaults = {
        preferredLanguage: appConstants.LANGUAGES.default
      };

      _.assign(that, defaults, userData);
    }

    /**
     * Return the constructor function
     */
    return Driver;
  });
