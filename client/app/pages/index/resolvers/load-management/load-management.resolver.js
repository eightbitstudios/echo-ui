'use strict';

angular.module('echo.index.resolvers.loadManagement', [
  'echo.api.loads'
])
  .factory('loadManagementResolver', function (loadsApi) {
    return {
      loadCounts: function (carrierId) {
        return loadsApi.fetchLoadCount(carrierId);
      }
    };
  });