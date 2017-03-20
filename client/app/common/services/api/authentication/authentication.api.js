'use strict';

angular.module('echo.api.authentication', [
  'echo.config.api',
  'echo.services.cookie',
  'echo.services.userProfile'
]).factory('authenticationApi', function ($injector, $base64, $q, $http, cookieService, apiConfig) {
  return {
    /**
     * @description Creates a password
     * @param {string} userId - User Id
     * @param {string} oneLoginUserId - One Login User Id
     * @param {string} token - User token for password creation
     * @param {PasswordChangeModel} passwordChange - Password change model
     * @returns {Promise} - Users password was created
     */
    createPassword: function (userId, token, passwordChange) {
      var url = _.template(apiConfig.createPassword)({ userId: userId });

      var data = {
        password: passwordChange.newPassword,
        confirmPassword: passwordChange.confirmPassword,
        invitationToken: token
      };

      return $http.post(url, data).then(function (resp) {
        cookieService.setRefreshToken(_.get(resp, 'data.refresh_token'));
        cookieService.setToken(_.get(resp, 'data.access_token'));
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
        cookieService.setRefreshToken(resp.data.data.refresh_token); // jshint ignore:line
        cookieService.setToken(resp.data.data.access_token); // jshint ignore:line
        return resp.data.data;
      }).catch(function (error) {
        return $q.reject(error.data.status.code);
      });
    },
    /**
     * @description Refreshes users session
     * @returns {Promise} - Users recieves new auth token
     */
    refresh: function () {

      var user =  $injector.get('store$').getState().user; // Only inject store when its needed.
      var url = _.template(apiConfig.refresh)({userId: user.userId});

      cookieService.setToken(cookieService.getRefreshToken());

      return $http.get(url).then(function (resp) {
        cookieService.setRefreshToken(resp.data.data.refresh_token); // jshint ignore:line
        cookieService.setToken(resp.data.data.access_token); // jshint ignore:line
        return $q.when();
      }).catch(function () {
        cookieService.clearToken();
        cookieService.clearRefreshToken();
        return $q.reject();
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
        cookieService.clearToken();
        cookieService.clearRefreshToken();
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

    /**
     * @description Change password
     * @param {string} username - Username
     * @returns {Promise} - Users change password request has been sent
     */
    changePassword: function (userId, changePassword) {
      var url = _.template(apiConfig.changePassword)({ userId: userId });

      var data = {
        password: changePassword.newPassword,
        confirmPassword: changePassword.confirmPassword
      };

      return $http.put(url, data).then(function (resp) {
        return resp;
      }).catch(function (error) {
        return $q.reject(error.data.status.code);
      });
    }
  };
});
