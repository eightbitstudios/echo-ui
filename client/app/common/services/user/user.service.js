'use strict';

angular.module('echo.services.user', [
  'echo.config.api',
  'echo.models.user'
])
  .factory('userService', function ($http, apiConfig, UserModel) {
    var user = {};

    return {
      /**
       * @description Retrieves stored user model
       */
      getUser: function () {
        return user;
      },

      /**
       * @description Retrieves a user by Id
       * @param {number} userId - Id for user
       * @returns {Promise} - Promise containing a UserModel
       */
      fetchUserById: function (userId) {
        var url = apiConfig.userById({ userId: userId });

        return $http.get(url).then(function (resp) {
          user = new UserModel(resp.data.data);
          return user;
        });
      }
    };
  });
