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
       * @description Retrieves a rep by Id
       * @param {number} repId - Id for rep
       * @returns {Promise} - Promise containing a RepModel
       */
      fetchRepById: function (repId) {

        var url = apiConfig.repById({ repId: repId });

        return $http.get(url).then(function (resp) {
          repDetails = new RepModel(resp.data);
          return repDetails;
        });
      }
    };
  });
