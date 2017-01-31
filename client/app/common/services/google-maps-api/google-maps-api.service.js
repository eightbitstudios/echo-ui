'use strict';

angular.module('echo.services.googleMapsApi', [
  'echo.config.api',
])
  .factory('googleMapsApi', function ($window, $q, keyConstants) {
    var deferred = $q.defer();

    function loadGoogleMapsApi() {
      var script = document.createElement('script');
      script.src = _.template('//maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap')({ googleMapsApiKey: keyConstants.GOOGLE_MAPS });
      document.body.appendChild(script);
    }

    $window.initMap = function () {
      deferred.resolve($window.google);
    };

    loadGoogleMapsApi();

    return deferred.promise;
  });
