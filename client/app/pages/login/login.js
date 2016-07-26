'use strict';
angular.module('echo.login', [
  'echo',
  'ui.router',
  'echo.config',
  'echo.directives.echoIcon',
  'echo.login.login',
  'echo.login.createPassword',
  'templates-app'
]).config(function ($urlRouterProvider, $stateProvider, routesConfig) {
  $urlRouterProvider.otherwise('/');
  
  // ROUTES
  $stateProvider
    .state(routesConfig.LOGIN.base.name, {
        abstract: true,
        template: '<div ui-view></div>'
    })
    .state(routesConfig.LOGIN.start.name, {
      url: routesConfig.LOGIN.start.route,
      template: '<login></login>'
    })
    .state(routesConfig.LOGIN.createPassword.name, {
      url: routesConfig.LOGIN.createPassword.route,
      template: '<create-password></create-password>'
    });
});