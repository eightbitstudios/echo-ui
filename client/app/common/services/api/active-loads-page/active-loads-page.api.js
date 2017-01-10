'use strict';

angular.module('echo.api.activeLoadsPage', [
  'echo.config.api',
  'echo.models.user'
]).factory('activeLoadsPageApi', function($q, $http, apiConfig) {

  function RequestBuilder(carrierId) {
    this._url = apiConfig.activeLoadsPage({
      carrierId: carrierId
    });

    this._params = {};
  }

  RequestBuilder.prototype.fetchActiveLoads = function(paging) {
    _.assign(this._params, {
      limit: paging.limit,
      offset: paging.offset,
      getActiveLoads: true
    });
    return this;
  };

  RequestBuilder.prototype.filterByPickupsToday = function() {
    _.assign(this._params, {
      pickupsToday: true
    });
    return this;
  };

  RequestBuilder.prototype.filterByDeliveriesToday = function() {
    _.assign(this._params, {
      deliveriesToday: true
    });
    return this;
  };

  RequestBuilder.prototype.fetchMapData = function() {
    _.assign(this._params, {
      getMapLoads: true
    });
    return this;
  };

  RequestBuilder.prototype.fetchLoadsCount = function() {
    _.assign(this._params, {
      getLoadsCount: true
    });
    return this;
  };

  RequestBuilder.prototype.execute = function() {
    return $http.get(this._url, {
      params: this._params
    }).then(function(resp) {
      return $q.when(resp.data.data);
    });
  };

  return {
    getRequestBuilder: function() {
      return RequestBuilder;
    }
  };
});