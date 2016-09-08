'use strict';

angular.module('echo.api.loads', [
  'echo.config.api',
]).factory('loadsApi', function ($q, $http, apiConfig) {
  return {
    fetchAvailableLoads: function (carrierId, paging, pickupsToday, deliveriesToday) {
      var url = apiConfig.availableLoadsByCarrierId({ carrierId: carrierId });

      var params = {
        limit: paging.limit,
        offset: paging.offset,
        pickupsToday: pickupsToday,
        deliveriesToday: deliveriesToday
      };

      return $http.get(url, { params: params }).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchUnbilledLoads: function (carrierId, paging, podNeeded, invoiceNeeded) {
      var url = apiConfig.unbilledLoadsByCarrierId({ carrierId: carrierId });

      var params = {
        limit: paging.limit,
        offset: paging.offset,
        podNeeded: podNeeded,
        invoiceNeeded: invoiceNeeded
      };

      return $http.get(url, { params: params }).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchUpcomingLoads: function (carrierId, paging, driverNeeded) {
      var url = apiConfig.upcomingLoadsByCarrierId({ carrierId: carrierId });

      var params = {
        limit: paging.limit,
        offset: paging.offset,
        driverNeeded: driverNeeded
      };

      return $http.get(url, { params: params }).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadsNeedingAction: function (carrierId, paging, driverNeeded) {
      var url = apiConfig.loadsNeedingAction({ carrierId: carrierId });

      var params = {
        limit: paging.limit,
        offset: paging.offset,
        driverNeeded: driverNeeded
      };

      return $http.get(url, {params: params}).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchMultiStopLoads: function (carrierId, paging, driverNeeded) {
      var url = apiConfig.multiStopLoads({ carrierId: carrierId });

      var params = {
        limit: paging.limit,
        offset: paging.offset,
        driverNeeded: driverNeeded
      };

      return $http.get(url, {params: params}).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadsBySearchText: function (carrierId, searchText, paging) {
      var url = apiConfig.loadsBySearchText({ carrierId: carrierId, searchText: searchText });

      var params = {
        limit: paging.limit,
        offset: paging.offset,
      };

      return $http.get(url, { params: params }).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadDetails: function (loadId) {
      var url = apiConfig.loadById({ loadId: loadId });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    assignDriver: function (loadId, driverId) {
      var url = apiConfig.assignDriverByLoadId({ loadId: loadId, userId: driverId });
      return $http.post(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    unassignDriver: function (loadId) {
      var url = apiConfig.unassignDriverByLoadId({ loadId: loadId });
      return $http.put(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    reassignDriver: function (loadId, driverId) {
      var url = apiConfig.reassignDriverByLoadId({ loadId: loadId, userId: driverId });
      return $http.put(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchUnassignedDriversByLoadId: function (loadId, carrierId) {
      var url = apiConfig.unassignedDriversByLoadId({ loadId: loadId, carrierId: carrierId });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchDriverStatusByLoadId: function (loadId, driverId) {
      var url = apiConfig.driverStatusByLoadId({ loadId: loadId, userId: driverId });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadCount: function (carrierId) {
      var url = apiConfig.loadCountByCarrierId({ carrierId: carrierId });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    createReportEmpty: function (loadGuid, reportEmpty) {
      var url = apiConfig.reportEmptyByLoadGuid({ loadGuid: loadGuid });
      return $http.post(url, reportEmpty).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    createReportLoaded: function (loadGuid, reportLoaded) {
      var url = apiConfig.reportLoadedByLoadGuid({ loadGuid: loadGuid });
      return $http.post(url, reportLoaded).then(function (resp) {
        return $q.when(resp.data.data);
      });
    }, 
    createReportLocation: function (loadGuid, reportLocation) {
      var url = apiConfig.reportLocation({ loadGuid: loadGuid });
      return $http.post(url, reportLocation).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },    
    fetchReportLoadedByLoadGuid: function (loadGuid) {
      var url = apiConfig.reportLoadedByLoadGuid({ loadGuid: loadGuid });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchItemsByLoadGuid: function (loadGuid) {
      var url = apiConfig.itemsByLoadGuid({ loadGuid: loadGuid });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchReportEmptyByLoadGuid: function (loadGuid) {
      var url = apiConfig.reportEmptyByLoadGuid({ loadGuid: loadGuid });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadUpdateOptionsByLoadGuid: function (loadGuid) {
      var url = apiConfig.loadUpdateOptionsByLoadGuid({ loadGuid: loadGuid });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchReportDeliveredByLoadGuid: function (loadGuid) {
      var url = apiConfig.reportDeliveredByLoadGuid({ loadGuid: loadGuid });
      return $http.get(url).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },
    createReportDelivered: function (loadGuid, reportDelivered) {
      var url = apiConfig.reportDeliveredByLoadGuid({ loadGuid: loadGuid });
      return $http.post(url, reportDelivered).then(function (resp) {
        return $q.when(resp.data.data);
      });
    },  
  };
});
