angular.module('echo.models.driver', [])
  .factory('DriverModel', function () {
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
        language: 'English'
      };
 
      _.assign(that, defaults, userData);
    }

    Driver.prototype.getFullName = function() {
      return _.join([this.firstName, this.lastName], ' ');
    };

    /**
     * Return the constructor function
     */
    return Driver;
  });
