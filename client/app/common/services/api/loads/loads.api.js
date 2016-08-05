'use strict';

angular.module('echo.api.loads', [
  'echo.config.api',
]).factory('loadsApi', function ($q, $http, apiConfig) {
  return {
    fetchAvailableLoads: function (carrierId) {
      var url = apiConfig.availableLoadsByCarrierId({ carrierId: carrierId });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchUnbilledLoads: function (carrierId) {
      var url = apiConfig.unbilledLoadsByCarrierId({ carrierId: carrierId });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchUpcomingLoads: function (carrierId) {
      var url = apiConfig.upcomingLoadsByCarrierId({ carrierId: carrierId });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadCount: function (carrierId) {
      var url = apiConfig.loadCountByCarrierId({ carrierId: carrierId });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    }
  };
});
