'use strict';

angular.module('echo.api.location', [
  'echo.config.api',
]).factory('locationApi', function ($q, $http, apiConfig) {
  return {
    fetchLocations: function (searchString) {
      var url = apiConfig.location,
        params = {
          searchString: searchString
        };

      return $http.get(url, { params: params }).then(function (resp) {
        return $q.when(resp.data.data);
      });
    }
  };
});
