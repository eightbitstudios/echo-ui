'use strict';

angular.module('echo.services.userProfile', [
  'echo.models.user'
])
  .factory('userProfileService', function ($base64, UserModel) {

    return {
      _user: {},
      /**
       * @description Retrieves stored user model
       */
      getUser: function () {
        return this._user;
      },

      setUser: function (user) {
        this._user = new UserModel(user);
      },

      /**
       * @description Maps a jwt to a user model
       * @param {string} jwt - base64 encoded jwt
       * @retuns {UserModel} - jwt converted to user model
       */
      mapJwtToUser: function (jwt) {
        var userObj = JSON.parse($base64.decode(_.split(jwt, '.')[1]));

        if (userObj && userObj.userId) {
          userObj.userId = _.parseInt(userObj.userId, 10);
        }

        if (userObj && userObj.carrierId) {
          userObj.carrierId = _.parseInt(userObj.carrierId, 10);
        }
        return new UserModel(userObj);
      }
    };
  });
