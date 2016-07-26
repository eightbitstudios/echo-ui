'use strict';
angular.module('echo.login', [
  'echo',
  'ui.router',
  'echo.config',
  'echo.directives.echoIcon',
  'echo.login.signIn',
  'echo.login.createPassword',
  'echo.login.forgotPassword',
  'templates-app'
]).config(function ($urlRouterProvider, $stateProvider, routesConfig) {
  $urlRouterProvider.otherwise('/');
  
  // ROUTES
  $stateProvider
    .state(routesConfig.LOGIN.base.name, {
        abstract: true,
        template: '<div ui-view></div>'
    })
    .state(routesConfig.LOGIN.signIn.name, {
      url: routesConfig.LOGIN.signIn.route,
      template: '<sign-in></sign-in>'
    })
    .state(routesConfig.LOGIN.createPassword.name, {
      url: routesConfig.LOGIN.createPassword.route,
      template: '<create-password></create-password>'
    })
    .state(routesConfig.LOGIN.forgotPassword.name, {
      url: routesConfig.LOGIN.forgotPassword.route,
      template: '<forgot-password></forgot-password>'
    });
});