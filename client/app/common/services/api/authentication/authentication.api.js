'use strict';

angular.module('echo.api.authentication', [
  'echo.config.api'
]).factory('authenticationApi', function ($q, $http, apiConfig) {
  return {
    /**
     * @description Creates a password
     * @param {string} userId - User Id
     * @param {string} token - User token for password creation
     * @param {PasswordChangeModel} passwordChange - Password change model
     * @returns {Promise} - Users password was created
     */
    createPassword: function (userId, token, passwordChange) {
      var url = apiConfig.createPassword({userId: userId});
      
      var data = {
        newPassword: passwordChange.newPassword,
        confirmPassword: passwordChange.confirmPassword,
        invitationToken: token
      };

      return $http.post(url, data).then(function (resp) {
        return resp;
      }).catch(function(){
        return $q.reject();
      });
    }
  };
});
