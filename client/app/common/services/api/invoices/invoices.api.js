'use strict';

angular.module('echo.api.invoices', [
  'echo.config.api'
]).factory('invoicesApi', function($q, $http, apiConfig) {
  return {
    fetchActiveInvoices: function(carrierId, paging, filterBy) {
      var url = _.template(apiConfig.activeInvoicesPage)({
        carrierId: carrierId
      });

      var params = {
        limit: paging.limit,
        offset: paging.offset
      };

      if (!_.isUndefined(filterBy)) {
        params.filterBy = filterBy;
      }

      return $http.get(url, {
        params: params
      }).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchInvoiceCount: function (carrierId) {
      var url = _.template(apiConfig.activeInvoicesPage)({
        carrierId: carrierId
      });

      var params = {
        limit: 1,
        offset: 0
      };

      return $http.get(url, {
        params: params
      }).then(function(resp) {
        return $q.when(resp.data.data.invoicesCount);
      });
    },
    fetchInvoicesBySearchText: function(carrierId, searchText, paging) {
      var url = _.template(apiConfig.invoicesSearch)({
        carrierId: carrierId
      });

      var params = {
        searchText: searchText,
        limit: paging.limit,
        offset: paging.offset
      };

      return $http.get(url, {
        params: params
      }).then(function(resp) {
        return $q.when(resp.data.data);
      });
    }
  };
});
