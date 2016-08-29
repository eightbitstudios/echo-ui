angular.module('echo.models.rep', [])
  .factory('RepModel', function () {
    
    /**
     * @description Model for a Rep
     * @param {Object} repData - Data to be converted to a Rep Model
     * @param {number} [repData.repId] - Rep Id
     * @param {string} [repData.firstName] - Rep's first name
     * @param {string} [repData.lastName] - Rep's last name
     * @param {string} [repData.email] - Rep email
     * @param {string} [repData.phone] - Rep phone number
     * @constructor
     */
    function Rep(repData) {

      var that = this;
 
      _.assign(that, repData);
    }

    /**
     * @description Returns a Reps phone number
     * @returns {string} - Rep phone number
     */
    Rep.prototype.getPhoneNumber = function () {
      return this.phone;
    };

    /**
     * Return the constructor function
     */
    return Rep;
  });
