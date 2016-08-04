'use strict';

angular.module('echo.api.loads', [
  'echo.config.api',
  'echo.models.loadManagement'
]).factory('loadsApi', function ($q, $http, apiConfig, LoadManagementModel) {
  return {
    fetchAvailableLoads: function (carrierId) {
      var url = apiConfig.availableLoadsByCarrierId({ carrierId: carrierId });
      return $http.get(url).then(function (resp) {
        return $q.when(_.map(resp.data.data, function (loadManagement) {
          return new LoadManagementModel(loadManagement);
        }));
      });
    },
    fetchUnbilledLoads: function (carrierId) {
      var url = apiConfig.unbilledLoadsByCarrierId({ carrierId: carrierId });
      return $http.get(url).then(function (resp) {
        return $q.when(_.map(resp.data.data, function (loadManagement) {
          return new LoadManagementModel(loadManagement);
        }));
      });
    },
    fetchUpcomingLoads: function (carrierId) {
      var url = apiConfig.upcomingLoadsByCarrierId({ carrierId: carrierId });
      return $http.get(url).then(function (resp) {
        return $q.when(_.map(resp.data.data, function (loadManagement) {
          return new LoadManagementModel(loadManagement);
        }));
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
