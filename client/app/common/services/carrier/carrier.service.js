'use strict';

angular.module('echo.services.carrier', [
  'echo.config.api',
  'echo.models.carrier'
]).factory('carrierService', function ($http, apiConfig, CarrierModel) {
  return {
    /**
     * @description Retrieves a list of carriers
     * @returns {Promise} - Promise containing an array of CarrierModel's
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
        return new CarrierModel(resp.data);
      });
    }
  };
});
