'use strict';

angular.module('echo.services.localStorage', [])
  .factory('localStorageService', function ($window) {
    return {
      getRefreshToken: function () {
        if ($window.localStorage) {
          $window.localStorage.getItem('refreshToken');
        }
      },
      setRefreshToken: function (token) {
        if ($window.localStorage) {
          $window.localStorage.setItem('refreshToken', token);
        }
      }
    };
  });
