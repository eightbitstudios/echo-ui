'use strict';

angular.module('echo.services.repDetails', [
  'echo.config.api',
  'echo.models.rep'
])
  .factory('repDetailsService', function ($http, apiConfig, RepModel) {
    var repDetails = {};

    return {
      /**
       * @description Retrieves stored rep model
       */
      getRepDetails: function () {
        return repDetails;
      },

      /**
       * @description Retrieves a rep for a carrier
       * @param {number} carrierId - Carrier Id for rep
       * @returns {Promise} - Promise containing a RepModel
       */
      fetchRepByCarrierId: function (carrierId) {

        var url = apiConfig.repByCarrierId({ carrierId: carrierId });

        return $http.get(url).then(function (resp) {
          repDetails = new RepModel(resp.data);
          return repDetails;
        });
      }
    };
  });
