angular.module('echo.models.user', [])
  .factory('UserModel', function () {
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

      if (userData) {
        that.userId = userData.user_id; // jshint ignore:line
        that.carrierId = userData.carrier_id; // jshint ignore:line
      }
    }

    /**
     * @description If the user is the rep admin
     * @return {boolean}
     */
    User.prototype.isRepAdmin = function () {
      return this.role === 'RepAdmin';
    };

    /**
     * @description Returns user role name
     * @return {string}
     */
    User.prototype.getRoleName = function () {
      return _.startCase(this.oneLoginRoleName);
    };

    /**
     * Return the constructor function
     */
    return User;
  });
