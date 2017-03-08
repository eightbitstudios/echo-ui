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
    'echo.config.reference',
    'echo.interceptors.api'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $base64, referenceConfig) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false);

    if (!_.isEmpty(referenceConfig.key)) {
      $httpProvider.defaults.headers.common[$base64.decode(referenceConfig.keyHeader)] = $base64.decode(referenceConfig.key);
    }
    
    $httpProvider.interceptors.push('apiInterceptor');
    $httpProvider.interceptors.push('authInterceptor');
  })
  .controller('AppCtrl', function() {})
  .run(function($rootScope, $uibModalStack, $state, routingService) {
    $rootScope.$state = $state; //Expose $state to rootScope

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, from) { //jshint unused:false
      routingService.handleRouting(event, toState, from);
    });

    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) { //jshint unused:false
        $uibModalStack.dismissAll();
        $rootScope.showLoading = false;
      }
    );
  });