'use strict';

angular.module('echo', [
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'base64',
  'ui.mask',
  'echo.services.routing',
  'echo.interceptors.auth',
  'ui.bootstrap',
  'echo.decorators.uiRouter'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .controller('AppCtrl', function () { })
  .run(function ($rootScope, $uibModalStack, $state, routingService) {
    $rootScope.$state = $state; //Expose $state to rootScope

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, from) {//jshint unused:false
      routingService.handleRouting(event, toState, from);
    });

    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) { //jshint unused:false
        $uibModalStack.dismissAll();
        $rootScope.showLoading = false;
      }
    );
  });
