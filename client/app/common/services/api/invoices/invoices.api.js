'use strict';

angular.module('echo.api.invoices', [
  'echo.config.api'
]).factory('invoicesApi', function($q, $http, apiConfig) {
  return {
    fetchActiveInvoices: function(carrierId, paging) {
      var url = _.template(apiConfig.activeInvoicesPage)({
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
    }
  };
});
