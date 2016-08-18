'use strict';

angular.module('echo', [
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'ngAnimate',
  'base64',
  'ui.mask',
  'echo.config.api',
  'echo.config.errors',
  'echo.services.cookie',
  'echo.api.authentication',
  'echo.services.user',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('authInterceptor');
  })

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
        if (_.get(rejection, 'data.status.code') === errorsConfig.UNAUTHORIZED && refreshCookie) {

          $rootScope.showLoading = true;
          var authenticationApi = $injector.get('authenticationApi'); // Avoid circular dependency
          authenticationApi.refresh().then(function () {
            $window.location.reload();
          }).catch(function() {  
            cookieService.clearToken();
            cookieService.clearRefreshToken(); 
            $window.location = routesConfig.LOGIN.base.url({ redirect: encodeURIComponent($window.location.hash) });
          }).finally(function() {
            $rootScope.showLoading = false;
          });
        }
        return $q.reject(rejection);
      }
    };
  })
  .controller('AppCtrl', function () { })
  .run(function ($rootScope, $uibModalStack, $window, $state, userService, routesConfig, cookieService) {
    $rootScope.$state = $state;
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, from) {//jshint unused:false

      if (_.get(toState.data, 'auth')) { // Check if state requires authentication
        var jwt = cookieService.getToken();
        if (from.name !== toState.name) {
          $state.previous = from;
        }
        if (jwt) {  // Check if user is authenticated
          var user = userService.mapJwtToUser(jwt);
          if (toState.name === routesConfig.INDEX.base.name) { // Reroute user to their dashboard based on role
            event.preventDefault();

            if (user.isRepAdmin()) {
              $state.go(routesConfig.INDEX.myCarriers.name);
            } else {
              $state.go(routesConfig.INDEX.activeLoads.name, { carrierId: user.carrierId });
            }
          } else if (_.get(toState.data, 'role') && toState.data.role !== _.get(user, 'role')) { // Prevent user from going to states they don't 
            // have permissions to.
            event.preventDefault();
          } else {
            $rootScope.showLoading = true;
          }
        } else {
          event.preventDefault(); // Reroute user to the login page if they are not authenticated
          $window.location = routesConfig.LOGIN.base.url({ redirect: encodeURIComponent($window.location.hash) });
        }
      }
    });

    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) { //jshint unused:false
        $uibModalStack.dismissAll();
        $rootScope.showLoading = false;
      }
    );
  });
