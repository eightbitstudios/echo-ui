'use strict';

angular.module('echo.index.resolvers.carrier', [
  'echo.api.carrier'
])
  .factory('carrierResolver', function (carrierApi) {
    return {
      carrierId: function ($stateParams) {
        return $stateParams.carrierId;
      },
      carrierDetails: function (carrierId) {
        return carrierApi.fetchCarrierById(carrierId);
      }
    };
  });