'use strict';

angular.module('echo.services.userProfile', [
  'echo.models.user'
])
  .factory('userProfileService', function ($base64, UserModel) {

    return {
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

        if (userObj && userObj.carrierIds) {
          userObj.carrierId = _.parseInt(_.head(userObj.carrierIds), 10);
        }

        /* jshint ignore:start */
        if (userObj && userObj.unique_name) {
          userObj.unique_name = _.get(userObj.unique_name, 'unique_name');
        }
        /* jshint ignore:end */

        return new UserModel(userObj);
      }
    };
  });
