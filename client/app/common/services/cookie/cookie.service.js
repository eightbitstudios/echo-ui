'use strict';

angular.module('echo.services.cookie', [])
  .factory('cookieService', function ($cookieStore) {
    return {
      getRefreshToken: function () {
        return $cookieStore.get('refreshToken');
      },
      setRefreshToken: function (token) {
        $cookieStore.put('refreshToken', token);
      },
      getToken: function () {
        return $cookieStore.get('token');
      },
      setToken: function (token) {
        $cookieStore.put('token', token);
      },
      clearToken: function (){
        $cookieStore.remove('token');
      },
      clearRefreshToken: function (){
        $cookieStore.remove('refreshToken');
      }
    };
  });
