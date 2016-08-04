angular.module('echo.models.loadManagement', [
  'echo.models.driver'
])
  .factory('LoadManagementModel', function (DriverModel) {
    /**
     * @description Model for a User
     * @param {Object} userData - Data to be converted to a User Model
     * @param {string} [userData.id] - User Id
     * @param {number} [userData.carrierId] - Carrier associated to user
     * @constructor
     */
    function LoadManagement(loadManagement) {

      var that = this;
 
      _.assign(that, loadManagement);

      that.driver = new DriverModel(loadManagement.driver);
    }

    /**
     * Return the constructor function
     */
    return LoadManagement;
  });
