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
    fetchArchivedInvoices: function(carrierId, paging) {
      var url = _.template(apiConfig.archivedInvoicesPage)({
        carrierId: carrierId
      });

      var params = {
        limit: paging.limit,
        offset: paging.offset
      };

      return $http.get(url, {
        params: params
      }).then(function(resp) {
        return $q.when(resp.data.data);
      });
    },
    fetchInvoiceCount: function (carrierId) {
      var url = _.template(apiConfig.invoiceCount)({
        carrierId: carrierId
      });

      return $http.get(url).then(function(resp) {
        return $q.when(resp.data.data);
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
