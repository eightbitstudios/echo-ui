'use strict';

angular.module('echo.services.carrier', [
  'echo.config.api',
  'echo.models.carrier'
]).factory('carrierService', function ($http, apiConfig, CarrierModel) {
  return {
    /**
     * @description Retrieves a list of carriers
     * @param {number} repId - Rep Id
     * @returns {Promise} - Promise containing an array of CarrierModel's
     */
    fetchCarriers: function (repId) {

      var url = apiConfig.carriers;
      var params = {
        'RepId': repId
      };

      return $http.get(url, { params: params }).then(function (resp) {
        return _.map(resp.data.data, function (carrier) {
          return new CarrierModel(carrier);
        });
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
        return new CarrierModel(resp.data.data);
      });
    },

    /**
     * @description Retrieves portal users for a carrier
     * @param {number} carrierId - Id for carrier
     * @returns {Promise} - Promise containing portal users
     */
    fetchCarrierPortalUsers: function (carrierId) {

      var url = apiConfig.portalUsers({ carrierId: carrierId });

      return $http.get(url).then(function (resp) {
        return resp.data.data;
      });
    },

    /**
     * @description Retrieves driver counts for a carrier
     * @param {number} carrierId - Id for carrier
     * @returns {Promise} - Promise containing driver counts
     */
    fetchCarrierDriverCount: function (carrierId) {

      var url = apiConfig.driverCount({ carrierId: carrierId });

      return $http.get(url).then(function (resp) {
        return resp.data.data;
      });
    }
  };
});
