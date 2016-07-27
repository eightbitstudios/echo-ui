'use strict';

angular.module('echo.api.authentication', [
  'echo.config.api',
  'echo.services.localStorage'
]).factory('authenticationApi', function ($base64, $q, $http, localStorageService, apiConfig) {
  return {
    /**
     * @description Creates a password
     * @param {string} userId - User Id
     * @param {string} oneLoginUserId - One Login User Id
     * @param {string} token - User token for password creation
     * @param {PasswordChangeModel} passwordChange - Password change model
     * @returns {Promise} - Users password was created
     */
    createPassword: function (userId, oneLoginUserId, token, passwordChange) {
      var url = apiConfig.createPassword({ userId: userId });

      var data = {
        password: passwordChange.newPassword,
        confirmPassword: passwordChange.confirmPassword,
        invitationToken: token,
        oneLoginId: oneLoginUserId
      };

      return $http.post(url, data).then(function (resp) {
        return resp;
      }).catch(function () {
        return $q.reject();
      });
    },

    /**
     * @description Signs in a user
     * @param {string} username - Username
     * @param {PasswordChangeModel} password - User's password
     * @returns {Promise} - Users is logged in
     */
    signIn: function (username, password) {
      var url = apiConfig.signIn;

      var authData = $base64.encode(username + ':' + password),
        data = {
          username: username,
          password: password
        };

      return $http.post(url, data, {
        headers: {
          'Authorization': 'Basic ' + authData
        }
      }).then(function (resp) {
        localStorageService.setRefreshToken(resp.data.data.refresh_token); // jshint ignore:line
        return resp.data.data;
      }).catch(function (error) {
        return $q.reject(error.data.status.code);
      });
    },

    /**
     * @description Signs out a user
     * @param {number} userId - User's id
     * @returns {Promise} - Users is signed out
     */
    signOut: function (userId) {
      var url = apiConfig.signOut;

      var data = {
        userId: userId
      };

      return $http.post(url, data).then(function (resp) {
        localStorageService.setRefreshToken(null);
        return resp.data.data;
      });
    },

    /**
     * @description Forgot password
     * @param {string} username - Username
     * @returns {Promise} - Users forgot password request has been sent
     */
    forgotPassword: function (username) {
      var url = apiConfig.forgotPassword;

      var data = {
        username: username
      };

      return $http.post(url, data).then(function (resp) {
        return resp;
      }).catch(function (error) {
        return $q.reject(error.data.status.code);
      });
    },

  };
});
