'use strict';
angular.module('echo.index', [
    'echo',
    'ui.router',
    'echo.config',
    'echo.index.controller',
    'echo.index.myCarriers',
    'echo.components.header',
    'echo.components.footer',
    'templates-app'
  ])

  .config(function($urlRouterProvider, $stateProvider, routesConfig) {
    $urlRouterProvider.otherwise(routesConfig.INDEX.myCarriers.route);

      // ROUTES
    $stateProvider
      .state(routesConfig.INDEX.myCarriers.name, {
        url: routesConfig.INDEX.myCarriers.route,
        template: '<my-carriers></my-carriers>'
      });
  });