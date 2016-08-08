'use strict';

angular.module('echo.api.loads', [
  'echo.config.api',
]).factory('loadsApi', function ($q, $http, apiConfig) {
  return {
    fetchAvailableLoads: function (carrierId, paging) {
      var url = apiConfig.availableLoadsByCarrierId({ carrierId: carrierId });

      var params = {
        limit: paging.limit,
        offset: paging.offset
      };

      return $http.get(url, {params: params}).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchUnbilledLoads: function (carrierId, paging) {
      var url = apiConfig.unbilledLoadsByCarrierId({ carrierId: carrierId });

      var params = {
        limit: paging.limit,
        offset: paging.offset
      };

      return $http.get(url, {params: params}).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchUpcomingLoads: function (carrierId, paging) {
      var url = apiConfig.upcomingLoadsByCarrierId({ carrierId: carrierId });

      var params = {
        limit: paging.limit,
        offset: paging.offset
      };

      return $http.get(url, {params: params}).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadsBySearchText: function (carrierId, searchText) {
      var url = apiConfig.loadsBySearchText({ carrierId: carrierId , searchText: searchText});

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
