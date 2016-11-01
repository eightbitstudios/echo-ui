'use strict';

angular.module('echo.services.googleMapsApi', [
  'echo.config.api',
])
  .factory('googleMapsApi', function ($window, $q, apiConfig) {
    var deferred = $q.defer();

    function loadGoogleMapsApi() {
      var script = document.createElement('script');
      script.src = _.template('//maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap')({ googleMapsApiKey: apiConfig.googleMapsApiKey });
      document.body.appendChild(script);
    }

    $window.initMap = function () {
      deferred.resolve($window.google);
    };

    loadGoogleMapsApi();

    return deferred.promise;
  });