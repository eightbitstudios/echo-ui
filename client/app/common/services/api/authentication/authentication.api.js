'use strict';

angular.module('echo.api.authentication', [
  'echo.config.api'
]).factory('authenticationApi', function ($base64, $q, $http, apiConfig) {
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
        return resp; // TODO: Do something with response once it is defined by the API team.
      }).catch(function (error) {
        return $q.reject(error.data.status.code);
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
