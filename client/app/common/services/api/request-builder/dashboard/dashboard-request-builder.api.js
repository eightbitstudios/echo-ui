'use strict';

angular.module('echo.api.requestBuilder.dashboard', [
  'echo.config.api',
  'echo.models.user'
]).factory('DashboardRequestBuilder', function($q, $http, apiConfig) {

  function DashboardRequestBuilder(carrierId) {
    this._url = apiConfig.loadDashboard({
      carrierId: carrierId
    });

    this._params = {};
  }

  DashboardRequestBuilder.prototype.fetchSingleStopLoads = function(paging) {
    _.assign(this._params, {
      getSingleStopLoads: true,
      singleStopLoadsLimit: paging.limit,
      singleStopLoadsOffset: paging.offset,
    });
    return this;
  };

  DashboardRequestBuilder.prototype.fetchMultiStopLoads = function(paging) {
    _.assign(this._params, {
      getMultiStopLoads: true,
      multiStopLoadsLimit: paging.limit,
      multiStopLoadsOffset: paging.offset,
    });
    return this;
  };

  DashboardRequestBuilder.prototype.fetchMapData = function() {
    _.assign(this._params, {
      getMapLoads: true
    });
    return this;
  };

  DashboardRequestBuilder.prototype.hasMapData = function() {
    return _.has(this._params, 'getMapLoads');
  };

  DashboardRequestBuilder.prototype.fetchActiveLoadsCount = function() {
    _.assign(this._params, {
      getActiveLoadsCount: true
    });
    return this;
  };
  
  DashboardRequestBuilder.prototype.fetchDashboardPage = function(singleStopPaging, multiStopPaging) {
    return this.fetchSingleStopLoads(singleStopPaging).fetchMultiStopLoads(multiStopPaging).fetchMapData().fetchActiveLoadsCount();
  };
  
  DashboardRequestBuilder.prototype.execute = function() {
    return $http.get(this._url, {
      params: this._params
    }).then(function(resp) {
      return $q.when(resp.data.data);
    });
  };

  return DashboardRequestBuilder;
});