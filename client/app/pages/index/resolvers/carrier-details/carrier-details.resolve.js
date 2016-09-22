'use strict';

angular.module('echo.index.resolvers.carrierDetails', [])
  .factory('carrierDetailsResolver', function () {
    return {
      carrierId: function ($stateParams) {
        return $stateParams.carrierId;
      }
    };
  });