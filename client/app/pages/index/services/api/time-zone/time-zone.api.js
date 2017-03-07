'use strict';

angular.module('echo.api.timeZone', [
  'echo.config.api'
])
  .factory('timeZoneApi', function ($http, apiConfig) {
    return {
      /**
       * @description Retrieves a rep for a carrier
       * @param {number} carrierId - Carrier Id for rep
       * @returns {Promise} - Promise containing a RepModel
       */
      fetchTimeZones: function () {

        var url = apiConfig.timeZones;

        return $http.get(url).then(function (resp) {
          return resp.data.data;
        });
      }
    };
  });
