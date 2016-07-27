'use strict';

angular.module('echo', [
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'base64',
  'echo.config.errors',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location, errorsConfig) {
    return {
      // Intercept 401s and redirect you to login
      responseError: function (response) {
 
        if (response.status === errorsConfig.UNAUTHORIZED) {
          $location.path('/login');
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
