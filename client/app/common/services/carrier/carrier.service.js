'use strict';

angular.module('echo.services.carrier', [
  'echo.config.api',
  'echo.models.carrier',
  'echo.models.driver',
  'echo.models.user'
]).factory('carrierService', function ($http, apiConfig, CarrierModel, UserModel, DriverModel) {
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
        return _(resp.data.data).map(function (user) {
          return new UserModel(user);
        }).value();
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
    },

    /**
     * @description Retrieves drivers for a carrier
     * @param {number} carrierId - Id for carrier
     * @param {number} [page] - Page number for drivers
     * @param {number} [searchText] - Search text for drivers
     * @returns {Promise} - Promise containing drivers
     */
    fetchDrivers: function (carrierId, page, searchText) {

      var url = apiConfig.drivers({ carrierId: carrierId });

      var params = {
        page: page,
        searchText: searchText
      };

      return $http.get(url, { params: params }).then(function (resp) {
        var drivers = _.map(resp.data.data, function (driver) {
          return new DriverModel(driver);
        });

        return {
          data: drivers,
          pagination: resp.data.pagination
        };
      });
    }
  };
});
