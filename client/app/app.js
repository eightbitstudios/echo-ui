'use strict';

angular.module('echo', [
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        var tokenCookie = $cookieStore.get('token');

        if (tokenCookie) {
          config.headers.Authorization = 'Bearer ' + tokenCookie;
        }

        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        var HTTP_UNAUTHORIZED = 401;

        if (response.status === HTTP_UNAUTHORIZED) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
        }

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
      function(event, toState, toParams, fromState, fromParams){ //jshint unused:false
        $uibModalStack.dismissAll();
        $rootScope.showLoading = false; //TODO: move to service
      }
    );
  });
