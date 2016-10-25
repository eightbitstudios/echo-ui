'use strict';

angular.module('echo.services.googleMapsApi', [])
  .factory('googleMapsApi', function ($window, $q) {
    var deferred = $q.defer();

    $window.initMap = function () {
      deferred.resolve();
    };

  return deferred.promise;
});
