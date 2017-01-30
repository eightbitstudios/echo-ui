'use strict';

angular.module('echo', [
    'ngCookies',
    'ui.router',
    'base64',
    'echo.config.api',
    'ui.mask',
    'echo.services.routing',
    'echo.interceptors.auth',
    'ui.bootstrap',
    'echo.decorators.uiRouter',
    'echo.store',
    'echo.config.globals'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $base64, keyConstants) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false);

    if (!_.isEmpty(keyConstants.KEY)) {
      $httpProvider.defaults.headers.common[$base64.decode(keyConstants.KEY_HEADER)] = $base64.decode(keyConstants.KEY);
    }

    $httpProvider.interceptors.push('authInterceptor');
  })
  .controller('AppCtrl', function() {})
  .run(function($rootScope, $uibModalStack, $state) {
    $rootScope.$state = $state; //Expose $state to rootScope

    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) { //jshint unused:false
        $uibModalStack.dismissAll();
      }
    );
  });