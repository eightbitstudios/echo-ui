'use strict';

angular.module('echo.services.googleMapsApi', [])
  .factory('googleMapsApi', function ($window, $q) {
    var deferred = $q.defer();

    function loadGoogleMapsApi() {
      var script = document.createElement('script');
      // TODO: Move api key to config
      script.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyC8RsoHfRqThfEIun95B9Q57aN2BT8L_OI&callback=initMap';
      document.body.appendChild(script);
    }

    $window.initMap = function () {
      deferred.resolve($window.google);
    };

    loadGoogleMapsApi();

    return deferred.promise;
  });
