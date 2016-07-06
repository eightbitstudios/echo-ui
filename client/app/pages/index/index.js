'use strict';
angular.module('echo.index', [
    'echo',
    'ui.router',
    'echo.config',
    'echo.index.controller',
    'echo.index.home',
    'templates-app'
  ])

  .config(function($urlRouterProvider, $stateProvider, routesConfig) {
    $urlRouterProvider.otherwise(routesConfig.INDEX.home.route);

      // ROUTES
    $stateProvider
      .state(routesConfig.INDEX.home.name, {
        url: routesConfig.INDEX.home.route,
        template: '<home></home>'
      });
  });