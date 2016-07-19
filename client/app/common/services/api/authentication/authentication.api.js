'use strict';

angular.module('echo.api.authentication', [
  'echo.config.api'
]).factory('authenticationApi', function ($q, $http, apiConfig) {
  return {
    /**
     * @description Creates a password
     * @param {string} token - User token for password creation
     * @param {PasswordChangeModel} passwordChange - Password change model
     * @returns {Promise} - Users password was created
     */
    createPassword: function (token, passwordChange) {

      var url = apiConfig.createPassword;
      
      var data = {
        token: token,
        newPassword: passwordChange.newPassword,
        confirmPassword: passwordChange.confirmPassword
      };

      return $http.post(url, data).then(function (resp) {
        return resp;
      }).catch(function(){
        return $q.reject();
      });
    }
  };
});
