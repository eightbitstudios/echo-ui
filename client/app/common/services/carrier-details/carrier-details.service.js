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

     
    };
  });
