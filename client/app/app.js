'use strict';

angular.module('echo', [
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'base64',
  'echo.config.api',
  'echo.config.errors',
  'echo.services.cookie',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location, errorsConfig, cookieService, apiConfig) {
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

      // Intercept 401s and redirect you to login
      responseError: function (response) {

        var refreshToken = cookieService.getRefreshToken();

        if (response.status === errorsConfig.UNAUTHORIZED) {
          $location.path('/login.html');
        } 
        /** else if(refreshToken) {
          authenticationApi.refresh().finally(function(){
            $location.reload();
          });
        }
        **/

        return $q.reject(response);
      }
    };
  })

  .controller('AppCtrl', function () { })

  .run(function ($rootScope, $uibModalStack) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {//jshint unused:false
      $rootScope.showLoading = true;  //TODO: move to service
    });

    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) { //jshint unused:false
        $uibModalStack.dismissAll();
        $rootScope.showLoading = false; //TODO: move to service
      }
    );
  });
