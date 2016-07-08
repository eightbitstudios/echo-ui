'use strict';

angular.module('echo.services.carrier', [
  'echo.config.api',
  'echo.models.carrier'
]).factory('carrierService', function ($http, apiConfig) {
  return {
    /**
     * @description Retrieves a list of carriers
     * @returns {Promise} - Promise containing a CarrierModel
     */
    fetchCarriers: function () {

      var url = apiConfig.carriers;

      return $http.get(url).then(function (resp) {
        return resp.data;
      });
    },

    /**
    * @description Retrieves a carrier by Id
    * @param {number} carrierId - Id for carrier
    * @returns {Promise} - Promise containing a CarrierModel
    */
    fetchCarrierById: function (carrierId) {

      var url = apiConfig.carrierById({ carrierId: carrierId });

      return $http.get(url).then(function (resp) {
        carrierDetails = new CarrierModel(resp.data);
        return carrierDetails;
      });
    }
  };
});
