angular.module('echo.models.user', [
  'echo.enums.roles'
])
  .factory('UserModel', function (RolesEnum) {
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
     * @description If the user is the rep admin
     * @return {boolean}
     */
    User.prototype.isRepAdmin = function () {
      return this.role === RolesEnum.REP_ADMIN;
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
