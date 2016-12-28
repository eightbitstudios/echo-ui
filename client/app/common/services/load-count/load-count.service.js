angular.module('echo.services.loadCount', [
  'echo.api.loads'
])
  .factory('loadCountService', function ($q, loadsApi) {

    return {
      _count: {},
      _defer: null,

      getLoadCount: function (isActiveLoads) {
        var that = this;

        if (that._count) {
          $q.when(that._count);
        }
        if (!isActiveLoads) {
          return loadsApi.fetchActiveLoadsPage().then(function(count) {
            that._count = count;
            return count;
          });
        } else{
          var defer = $q.defer();
          that._defer = defer;
          return defer.promise;
        }
      },

      setLoadCount: function(count) {
        this._count = count;
        this._defer.resolve(count);
      }
    };
  });
