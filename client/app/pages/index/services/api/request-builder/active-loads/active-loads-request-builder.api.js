'use strict';

angular.module('echo.api.requestBuilder.activeLoads', [
  'echo.config.api'
]).factory('ActiveLoadsRequestBuilder', function($q, $http, apiConfig) {

  function ActiveLoadsRequestBuilder(carrierId) {
    this._url = _.template(apiConfig.activeLoadsPage)({
      carrierId: carrierId
    });

    this._params = {};
  }

  ActiveLoadsRequestBuilder.prototype.fetchActiveLoads = function(paging) {
    _.assign(this._params, {
      limit: paging.limit,
      offset: paging.offset,
      getActiveLoads: true
    });
    return this;
  };

  ActiveLoadsRequestBuilder.prototype.filterByPickupsToday = function() {
    _.assign(this._params, {
      pickupsToday: true
    });
    return this;
  };

  ActiveLoadsRequestBuilder.prototype.filterByCancelledToday = function() {
    _.assign(this._params, {
      cancelledToday: true
    });
    return this;
  };

  ActiveLoadsRequestBuilder.prototype.filterByDeliveriesToday = function() {
    _.assign(this._params, {
      deliveriesToday: true
    });
    return this;
  };

  ActiveLoadsRequestBuilder.prototype.fetchMapData = function() {
    _.assign(this._params, {
      getMapLoads: true
    });
    return this;
  };

  ActiveLoadsRequestBuilder.prototype.hasMapData = function() {
    return _.has(this._params, 'getMapLoads');
  };

  ActiveLoadsRequestBuilder.prototype.fetchLoadsCount = function() {
    _.assign(this._params, {
      getLoadsCount: true
    });
    return this;
  };

  ActiveLoadsRequestBuilder.prototype.execute = function() {
    return $http.get(this._url, {
      params: this._params
    }).then(function(resp) {
      return $q.when(resp.data.data);
    });
  };

  return ActiveLoadsRequestBuilder;
});