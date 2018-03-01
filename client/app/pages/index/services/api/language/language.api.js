'use strict';

angular.module('echo.api.language', [
  'echo.config.api'
]).factory('languageApi', function ($http, apiConfig) {
  return {
      fetchLanguages: function () {

        var url = apiConfig.language;
        
        return $http.get(url).then(function (resp) {
          return resp.data.data;
        });
      }
  };
});
