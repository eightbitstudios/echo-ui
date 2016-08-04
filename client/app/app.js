'use strict';

angular.module('echo', [
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'base64',
  'echo.config.api',
  'echo.config.errors',
  'echo.services.cookie',
  'echo.services.user',
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

        //var refreshToken = cookieService.getRefreshToken();

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
  .run(function ($rootScope, $uibModalStack, $window, $state, userService, routesConfig, cookieService) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {//jshint unused:false

      if (_.get(toState.data, 'auth')) { // Check if state requires authentication
        var jwt = cookieService.getToken();

        if (jwt) {  // Check if user is authenticated
          var user = userService.mapJwtToUser(jwt);
          if (toState.name === routesConfig.INDEX.base.name) { // Reroute user to their dashboard based on role
            event.preventDefault();
            
            if (user.isRepAdmin()) {
              $state.go(routesConfig.INDEX.myCarriers.name);
            } else {
              $state.go(routesConfig.INDEX.carrier.name, { carrierId: user.carrierId });
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
