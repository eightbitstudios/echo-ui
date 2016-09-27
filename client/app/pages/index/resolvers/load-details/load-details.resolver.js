'use strict';

angular.module('echo.index.resolvers.loadDetails', [
  'echo.api.loads'
])
  .factory('loadDetailsResolver', function (loadsApi) {
    return {
      loadId: function ($stateParams) {
        return $stateParams.loadId;
      },
      loadDetails: function (loadId) {
        return loadsApi.fetchLoadDetails(loadId);
      },
      activityLog: function (loadDetails) {
        return loadsApi.fetchActivityLogByLoadId(loadDetails.loadNumber);
      }
    };
  });