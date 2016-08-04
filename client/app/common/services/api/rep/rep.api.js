'use strict';

angular.module('echo.api.rep', [
  'echo.config.api',
  'echo.models.rep'
])
  .factory('repApi', function ($http, apiConfig, RepModel) {
    var repDetails = {};

    return {
      /**
       * @description Retrieves a rep for a carrier
       * @param {number} carrierId - Carrier Id for rep
       * @returns {Promise} - Promise containing a RepModel
       */
      fetchRepByCarrierId: function (carrierId) {

        var url = apiConfig.repByCarrierId({ carrierId: carrierId });

        return $http.get(url).then(function (resp) {
          repDetails = new RepModel(resp.data.data);
          return repDetails;
        });
      }
    };
  });
