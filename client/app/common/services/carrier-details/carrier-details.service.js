'use strict';

angular.module('echo.services.carrierDetails', [])
  .factory('carrierDetailsService', function ($q) {
    var carrierDetails = {};

    return {
      getCarrierDetails: function (){
        return carrierDetails;
      },
      fetchCarrierDetails: function () {
        carrierDetails = {
          name: 'Company A'
        };
        return $q.when(carrierDetails);
      }
    };
  });
