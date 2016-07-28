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

      setUser: function (user) {
        this.user = new UserModel(user);
      },

      mapJwtToUser: function (jwt) {
        var userObj = JSON.parse($base64.decode(_.split(jwt, '.')[1]));

        if (userObj && userObj.user_id) {  // jshint ignore:line
          userObj.userId = _.parseInt(userObj.user_id, 10); // jshint ignore:line
        }

        if (userObj && userObj.carrier_id) {  // jshint ignore:line
          userObj.carrierId = _.parseInt(userObj.carrier_id, 10); // jshint ignore:line
        }
        return new UserModel(userObj);
      }
    };
  });
