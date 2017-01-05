angular.module('echo.services.loadCount', [
    'echo.api.loads'
  ])
  .factory('loadCountService', function($q, loadsApi) {
    return {
      _count: null,
      _defer: null,
      getLoadCount: function() {
        return this._count;
      },
      fetchLoadCount: function(carrierId, isActiveLoads) {
        var that = this;

        if (that._count) {
          return $q.when(that._count);
        }

        if (!isActiveLoads) {
          return loadsApi.fetchLoadCount(carrierId).then(function(count) {
            that._count = count;
            return count;
          });
        } else {
          return that.getLoadCountDefer().promise;
        }
      },
      getLoadCountDefer: function() {
        var that = this;

        if (!that._defer) {
          var defer = $q.defer();
          that._defer = defer;
        }

        return that._defer;
      },
      setLoadCount: function(count) {
        this._count = count;
        this._defer.resolve(count);
      },
      clear: function() {
        this._count = null;
        this._defer = null;
      }
    };
  });