'use strict';

angular.module('echo.api.driver', [
  'echo.config.api'
]).factory('driverApi', function ($q, $http, apiConfig) {
  return {
    
      /**
       * @description Upserts a portal user
       * @param {DriverModel} driver
       * @returns {Promise} - Promise containing a DriverModel
       */
      upsertDriver: function (carrierId, driver) {

        var serviceCall;
        if (driver.id) {
          serviceCall = this.updateDriverById(carrierId, driver);
        } else {
          serviceCall = this.insertDriver(carrierId, driver);
        }
        return serviceCall;
      },

      /**
       * @description Updates a driver
       * @param {DriverModel} driver
       * @returns {Promise} - Promise containing a DriverModel
       */
      updateDriverById: function (carrierId, driver) {

        var url = apiConfig.driverById({ carrierId: carrierId, driverId: driver.id });

        return $http.put(url, driver).then(function (resp) {
          return resp.data.data;
        }).catch(function (resp) {
          return $q.reject(resp.data.status.message);
        });
      },

      /**
       * @description Deactivates a portal user
       * @param {DriverModel} driver
       * @returns {Promise} - Promise containing a DriverModel
       */
      deactivateDriverById: function (carrierId, driver) {

        var url = apiConfig.deactivateDriverById({ carrierId: carrierId, driverId: driver.id });

        return $http.put(url, driver).then(function (resp) {
          return resp.data.data;
        }).catch(function (resp) {
          return $q.reject(resp.data.status.message);
        });
      },
      /**
       * @description Creates a new portal user
       * @param {DriverModel} driver
       * @returns {Promise} - Promise containing a DriverModel
       */
      insertDriver: function (carrierId, driver) {

        var url = apiConfig.drivers({carrierId: carrierId});
        
        return $http.post(url, driver).then(function (resp) {
          return resp.data.data;
        }).catch(function (resp) {
          return $q.reject(resp.data.status.message);
        });
      },      
      
      /**
       * @description Fetches a driver by id
       * @param {number} carrierId
       * @param {number} driverId
       * @returns {Promise} - Promise containing a DriverModel
       */
      fetchDriverById: function (carrierId, driverId) {

        var url = apiConfig.driverById({ carrierId: carrierId, driverId: driverId });
        
        return $http.get(url).then(function (resp) {
          return resp.data.data;
        });
      }
  };
});
