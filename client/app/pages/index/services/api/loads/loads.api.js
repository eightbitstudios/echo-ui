'use strict';

angular.module('echo.api.loads', [
  'echo.config.api',
  'echo.models.user'
]).factory('loadsApi', function($q, $http, apiConfig, UserModel) {
  return {
    fetchUnbilledLoads: function(carrierId, paging, podNeeded, invoiceNeeded) {
      var url = _.template(apiConfig.unbilledLoadsByCarrierId)({
        carrierId: carrierId
      });

      var params = {
        limit: paging.limit,
        offset: paging.offset,
        podNeeded: podNeeded,
        invoiceNeeded: invoiceNeeded
      };

      return $http.get(url, {
        params: params
      }).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchUpcomingLoads: function(carrierId, paging, driverNeeded) {
      var url = _.template(apiConfig.upcomingLoadsByCarrierId)({
        carrierId: carrierId
      });

      var params = {
        limit: paging.limit,
        offset: paging.offset,
        driverNeeded: driverNeeded
      };

      return $http.get(url, {
        params: params
      }).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadsBySearchText: function(carrierId, searchText, paging) {
      var url = _.template(apiConfig.loadsBySearchText)({
        carrierId: carrierId,
        searchText: searchText
      });

      var params = {
        limit: paging.limit,
        offset: paging.offset,
      };

      return $http.get(url, {
        params: params
      }).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadDetails: function(loadId) {
      var url = _.template(apiConfig.loadById)({
        loadId: loadId
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    assignDriver: function(loadId, driverId) {
      var url = _.template(apiConfig.assignDriverByLoadId)({
        loadId: loadId,
        userId: driverId
      });
      return $http.post(url).then(function(resp) {
        return $q.when(resp.data.data);
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    unassignDriver: function(loadId) {
      var url = _.template(apiConfig.unassignDriverByLoadId)({
        loadId: loadId
      });
      return $http.put(url).then(function(resp) {
        return $q.when(resp.data.data);
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    reassignDriver: function(loadId, driverId) {
      var url = _.template(apiConfig.reassignDriverByLoadId)({
        loadId: loadId,
        userId: driverId
      });
      return $http.put(url).then(function(resp) {
        return $q.when(resp.data.data);
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    fetchUnassignedDriversByLoadId: function(loadId, carrierId) {
      var url = _.template(apiConfig.unassignedDriversByLoadId)({
        loadId: loadId,
        carrierId: carrierId
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchDriverStatusByLoadId: function(loadId, driverId) {
      var url = _.template(apiConfig.driverStatusByLoadId)({
        loadId: loadId,
        userId: driverId
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchActivityLogByLoadId: function(loadId) {
      var url = _.template(apiConfig.activityLogByLoadId)({
        loadId: loadId
      });
      return $http.get(url).then(function(resp) {
        return $q.when(_.map(resp.data.data, function(activity) {
          activity.user = new UserModel(activity.user);
          return activity;
        }));
      });
    },
    fetchLoadCount: function(carrierId) {
      var url = _.template(apiConfig.loadCountByCarrierId)({
        carrierId: carrierId
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    createReportEmpty: function(loadGuid, reportEmpty) {
      var url = _.template(apiConfig.reportEmptyByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.post(url, reportEmpty).then(function(resp) {
        return $q.when(resp.data.data);
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    createReportLocation: function(loadGuid, reportLocation) {
      var url = _.template(apiConfig.reportLocation)({
        loadGuid: loadGuid
      });
      return $http.post(url, reportLocation).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    createReportTrailer: function(loadGuid, reportTrailer) {
      var url = _.template(apiConfig.reportTrailerByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.post(url, reportTrailer).then(function(resp) {
        return $q.when(resp.data.data);
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    createReportLoaded: function(loadGuid, reportLoaded) {
      var url = _.template(apiConfig.reportLoadedByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.post(url, reportLoaded).then(function(resp) {
        return $q.when(resp.data.data);
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    updateProNumber: function(loadId, payload) {
      var url = _.template(apiConfig.proNumberByLoadId)({
        loadId: loadId
      });
      return $http.put(url, payload).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchReportLoadedByLoadGuid: function(loadGuid) {
      var url = _.template(apiConfig.reportLoadedByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchItemsByLoadGuid: function(loadGuid) {
      var url = _.template(apiConfig.itemsByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchReportEmptyByLoadGuid: function(loadGuid) {
      var url = _.template(apiConfig.reportEmptyByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    updateTrailerNumber: function(loadId, payload) {
      var url = _.template(apiConfig.trailerNumberByLoadId)({
        loadId: loadId
      });
      return $http.put(url, payload).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    createReportArrivalByLoadGuid: function(loadGuid, reportArrival) {
      var url = _.template(apiConfig.reportArrivalByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.post(url, reportArrival).then(function(resp) {
        return $q.when(resp.data.data);
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    fetchReportArrivalByLoadGuid: function(loadGuid) {
      var url = _.template(apiConfig.reportArrivalByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchLoadUpdateOptionsByLoadGuid: function(loadGuid) {
      var url = _.template(apiConfig.loadUpdateOptionsByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchReportDeliveredByLoadGuid: function(loadGuid) {
      var url = _.template(apiConfig.reportDeliveredByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    createReportDelivered: function(loadGuid, reportDelivered) {
      var url = _.template(apiConfig.reportDeliveredByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.post(url, reportDelivered).then(function(resp) {
        return $q.when(resp.data.data);
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    createFeedback: function(loadGuid, starRatings, comment) {
      var url = _.template(apiConfig.feedbackByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.post(url, {
        starRatings: starRatings,
        comment: comment
      }).then(function(resp) {
        return $q.when(resp.data.data);
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    fetchEquipmentByLoadId: function(loadId) {
      var url = _.template(apiConfig.equipmentByLoadId)({
        loadId: loadId
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchMapPointByLoadGuid: function(loadGuid) {
      var url = _.template(apiConfig.mapPointByLoadGuid)({
        loadGuid: loadGuid
      });
      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
      });
    }
  };
});