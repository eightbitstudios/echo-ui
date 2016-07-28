'use strict';

angular.module('echo.services.user', [
  'echo.config.api',
  'echo.models.user'
])
  .factory('userService', function ($base64, $http, $q, UserModel) {

    return {
      user: {},
      /**
       * @description Retrieves stored user model
       */
      getUser: function () {
        return this.user;
      },

      setUser: function(user){
        this.user = new UserModel(user);
      },

      mapJwtToUser: function(jwt) {
        var userObj =  JSON.parse($base64.decode(_.split(jwt, '.')[1]));
        return new UserModel(userObj);
      }
    };
  });
