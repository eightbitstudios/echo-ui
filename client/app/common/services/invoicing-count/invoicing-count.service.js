angular.module('echo.services.invoicingCount', [
  'echo.api.invoices'
])
  .factory('invoicingCountService', function($q, invoicesApi) {
    return {
      _count: null,
      _defer: null,
      getInvoiceCount: function() {
        return this._count;
      },
      fetchInvoiceCount: function(carrierId, isActiveInvoices) {
        var that = this;

        if (that._count) {
          return $q.when(that._count);
        }

        if (!isActiveInvoices) {
          return invoicesApi.fetchActiveInvoices(carrierId).then(function(count) {
            that._count = count;
            return count;
          });
        } else {
          return that.getInvoiceCountDefer().promise;
        }
      },
      getInvoiceCountDefer: function() {
        var that = this;

        if (!that._defer) {
          var defer = $q.defer();
          that._defer = defer;
        }

        return that._defer;
      },
      setInvoiceCount: function(count) {
        this._count = count;
        this._defer.resolve(count);
      },
      clear: function() {
        this._count = null;
        this._defer = null;
      }
    };
  });
