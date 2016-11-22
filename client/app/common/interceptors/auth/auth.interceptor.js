angular.module('echo.interceptors.auth', [
  'echo.config.api',
  'echo.config.errors',
  'echo.services.cookie',
  'echo.api.authentication'
])
  .factory('authInterceptor', function ($rootScope, $injector, $window, $q, errorsConfig, routesConfig, cookieService, apiConfig) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        var tokenCookie = cookieService.getToken();
        var refreshCookie = cookieService.getRefreshToken();

        if (refreshCookie && config.url === apiConfig.refresh) {
          config.headers.Authorization = 'Bearer ' + refreshCookie;
        } else if (tokenCookie && config.url !== apiConfig.signIn) {
          config.headers.Authorization = 'Bearer ' + tokenCookie;
        }

        return config;
      },
      responseError: function (rejection) {
        var refreshCookie = cookieService.getRefreshToken();
        if ((_.get(rejection, 'data.code') === errorsConfig.EXPIRED_TOKEN || _.get(rejection, 'data.code') === errorsConfig.UNAUTHORIZED)&& refreshCookie) {

          $rootScope.showLoading = true;
          var authenticationApi = $injector.get('authenticationApi'); // Avoid circular dependency
          authenticationApi.refresh().then(function () {
            $window.location.reload();
          }).catch(function () {
            cookieService.clearToken();
            cookieService.clearRefreshToken();
            $window.location = routesConfig.LOGIN.base.url({ redirect: encodeURIComponent($window.location.hash) });
          }).finally(function () {
            $rootScope.showLoading = false;
          });
        }
        return $q.reject(rejection);
      }
    };
  });