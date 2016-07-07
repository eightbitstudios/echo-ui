angular.module('echo.models.user', [])
  .factory('UserModel', function ($location) {
    /**
     * @description Model for a User
     * @param {Object} userData - Data to be converted to a User Model
     * @param {string} [userData.id] - User Id
     * @param {number} [userData.carrierId] - Carrier associated to user
     * @constructor
     */
    function User(userData) {

      var that = this;
 
      _.assign(that, userData);
    }

    /**
     * @description If the user is the carriers rep
     * @return {boolean}
     */
    User.prototype.isCarrierRep = function () {
      return $location.search().isCarrierRep;
    };

    /**
     * Return the constructor function
     */
    return User;
  });
