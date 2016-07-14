angular.module('echo.models.carrier', [
  'echo.enums.carrier'
]).factory('CarrierModel', function (carrierEnum) {

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
   * Returns if the carrier is inactive
   * @returns {boolean}
   */
  Carrier.prototype.isInactive = function () {
    return this.status === carrierEnum.STATUS.INACTIVE;
  };

  /**
   * Return the constructor function
   */
  return Carrier;
});
