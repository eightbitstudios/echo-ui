angular.module('echo.models.carrier', []).factory('CarrierModel', function () {

  /**
   * @description Model for a Carrier
   * @param {Object} carrierData - Data to be converted to a Carrier Model
   * @param {number} [carrierData.carrierId] - Carrier id
   * @param {number} [carrierData.repId] - Rep associated with carrier
   * @param {string} [carrierData.carrierName] - Carrier name
   * @param {string} [carrierData.isActive] - If carrier is active
   * @constructor
   */
  function Carrier(carrierData) {

    var that = this;

    _.assign(that, carrierData);
  }

  /**
   * Returns carrier Id
   * @returns {number}
   */
  Carrier.prototype.getId = function () {
    return this.carrierId;
  };

  /**
   * Returns carrier name
   * @returns {number}
   */
  Carrier.prototype.getName = function () {
    return this.carrierName;
  };

  /**
   * Returns if the carrier is inactive
   * @returns {boolean}
   */
  Carrier.prototype.isInactive = function () {
    return !this.isActive;
  };

  /**
   * Returns if the carrier is inactive
   * @returns {boolean}
   */
  Carrier.prototype.getFullAddress = function () {
    var address = _([this.address1, this.address2, this.city, this.state]).join(', ');
     return _([address, this.zip]).join(' ');
  };
  /**
   * Return the constructor function
   */
  return Carrier;
});
