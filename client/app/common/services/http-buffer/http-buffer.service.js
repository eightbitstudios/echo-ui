'use strict';

angular.module('echo.services.httpBuffer', [])
  .factory('httpBufferService', function($injector) {
    var buffer = []; // Holds all of the failed request


    function retryHttpRequest(config, deferred) {

      var $http = $injector.get('$http'); // Avoid circular dependency

      $http(config).then(function(response) {
        deferred.resolve(response);
      }).catch(function(response) {
        deferred.reject(response);
      });
    }

    return {
      add: function(config, deferred) {
        return buffer.push({
          config: config,
          deferred: deferred
        });
      },
      isBufferEmpty: function() {
        return _.isEmpty(buffer);
      },
      retryAllRequest: function() {
        _.forEach(buffer, function(request) {
          retryHttpRequest(request.config, request.deferred);
        });

        buffer = [];
      }
    };
  });