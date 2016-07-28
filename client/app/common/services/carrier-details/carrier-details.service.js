'use strict';

angular.module('echo.services.carrierDetails', [
  'echo.config.api',
  'echo.api.carrier'
])
  .factory('carrierDetailsService', function ($http, apiConfig, carrierApi) {
    var carrierDetails = {};

    return {
      /**
       * @description Retrieves stored carrier model
       */
      getCarrierDetails: function () {
        return carrierDetails;
      },

    /**
      * @description Retrieves a carrier by Id and stores the model
      * @param {number} carrierId - Id for carrier
      * @returns {Promise} - Promise containing a CarrierModel
      */
      fetchCarrierById: function (carrierId) {
        return carrierApi.fetchCarrierById(carrierId).then(function(carrier){
          carrierDetails = carrier;
          return carrierDetails;
        });
      }
    };
  });
