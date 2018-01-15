angular.module('echo.services.googleMapsApi.mock', [])
    .provider('googleMapsApi', function() {
      this.$get = function($q) {

        return $q.resolve(google); // jshint ignore:line

      };
    });
