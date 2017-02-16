angular.module('echo.interceptors.auth', [
    'echo.config.api',
    'echo.config.errors',
    'echo.services.cookie',
    'echo.api.authentication',
    'echo.services.httpBuffer'
  ])
  .factory('authInterceptor', function($rootScope, $injector, $window, $q, $base64,
    errorsConfig, routesConfig, cookieService, apiConfig, httpBufferService) {

    return {
      // Add authorization token to headers
      request: function(config) {
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
      responseError: function(rejection) {
        var refreshCookie = cookieService.getRefreshToken();
        if (_.get(rejection, 'data.code') === errorsConfig.UNAUTHORIZED) {
           cookieService.clearToken();
           cookieService.clearRefreshToken();
           $window.location = routesConfig.LOGIN.base.url;
          } else if (_.get(rejection, 'data.code') === errorsConfig.EXPIRED_TOKEN && refreshCookie) {

          var authenticationApi = $injector.get('authenticationApi'); // Avoid circular dependency

          if (httpBufferService.isBufferEmpty()) {
            authenticationApi.refresh().then(function() {
              httpBufferService.retryAllRequest();
            }).catch(function() {
              cookieService.clearToken();
              cookieService.clearRefreshToken();
              $window.location = routesConfig.LOGIN.base.redirectUrl({
                redirect: encodeURIComponent($window.location.hash)
              });
            });
          }

          var deferred = $q.defer();
          httpBufferService.add(rejection.config, deferred);

          return deferred.promise;
        }
        return $q.reject(rejection);
      }
    };
  });