angular.module('echo.models.carrier', [])
  .factory('CarrierModel', function () {

    /**
     * @description Model for a Carrier
     * @param {Object} carrierData - Data to be converted to a Carrier Model
     * @param {number} [carrierData.id] - Carrier id
     * @param {number} [carrierData.repId] - Rep associated with carrier
     * @param {string} [carrierData.name] - Carrier name
     * @constructor
     */
    function Carrier(carrierData) {

      var that = this;
 
      _.assign(that, carrierData);
    }

    /**
     * Return the constructor function
     */
    return Carrier;
  });
