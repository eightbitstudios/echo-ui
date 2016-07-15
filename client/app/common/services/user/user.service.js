'use strict';

angular.module('echo.services.user', [
  'echo.config.api',
  'echo.models.user'
])
  .factory('userService', function ($http, $q, UserModel) {
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
      fetchUserById: function () {
        user = new UserModel({id: 1, repId: 45, carrierId: 1}); //TODO: replace with service call once we can get a user profile
        return $q.when(user);
      }
    };
  });
