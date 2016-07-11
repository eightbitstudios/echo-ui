'use strict';

angular.module('echo.services.carrierDetails', [
  'echo.config.api',
  'echo.models.carrier'
])
  .factory('carrierDetailsService', function ($http, apiConfig, CarrierModel) {
    var carrierDetails = {};

    return {
      /**
       * @description Retrieves stored carrier model
       */
      getCarrierDetails: function () {
        return carrierDetails;
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
