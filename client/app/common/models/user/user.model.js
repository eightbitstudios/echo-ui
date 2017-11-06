angular.module('echo.models.user', [
  'echo.constant.roles'
])
  .factory('UserModel', function (roleConstants) {
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
      that.roleName = _.get(userData, 'oneLoginRoleName') || _.get(userData, 'role');
    }

    /**
     * @description If the user is the rep admin
     * @return {boolean}
     */
    User.prototype.isRepAdmin = function () {
      return this.roleName === roleConstants.ECHO_REP;
    };

    /**
     * @description If the user is the rep admin
     * @return {boolean}
     */
    User.prototype.isCarrierAdmin = function () {
      return this.roleName === roleConstants.CARRIER_ADMIN;
    };

    /**
     * @description Returns user role name
     * @return {string}
     */
    User.prototype.getRoleName = function () {
      return _.startCase(this.roleName);
    };

    // User.prototype.unique_name = function () {
    //   return _.startCase(this.unique_name);
    // };

    /**
     * Return the constructor function
     */
    return User;
  });
