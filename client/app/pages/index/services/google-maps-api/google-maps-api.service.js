'use strict';

angular.module('echo.services.googleMapsApi', [
  'echo.config.api',
  'echo.config.envVars'
])
  .factory('googleMapsApi', function ($window, $q, envVarsConfig) {
    var deferred = $q.defer();

    function loadGoogleMapsApi() {
      var script = document.createElement('script');
      script.src = _.template('//maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap')({ googleMapsApiKey: envVarsConfig.googleMapsKey });
      document.body.appendChild(script);
    }

    $window.initMap = function () {
      deferred.resolve($window.google);
    };

    loadGoogleMapsApi();

    return deferred.promise;
  });
