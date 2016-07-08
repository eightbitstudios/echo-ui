'use strict';

angular.module('echo.services.carrierDetails', [
  'echo.config.api',
  'echo.services.carrier'
])
  .factory('carrierDetailsService', function ($http, apiConfig, carrierService) {
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
        return carrierService.fetchCarrierById(carrierId).then(function(carrier){
          carrierDetails = carrier;
          return carrierDetails;
        });
      }
    };
  });
