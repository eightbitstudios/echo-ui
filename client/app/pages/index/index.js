'use strict';
angular.module('echo.index', [
  'echo',
  'ui.router',
  'echo.config',
  'echo.index.controller',
  'echo.index.myCarriers',
  'echo.components.header',
  'echo.components.footer',
  'echo.services.carrierDetails',
  'echo.services.repDetails',
  'echo.services.user',
  'templates-app'
]).config(function ($urlRouterProvider, $stateProvider, routesConfig) {
  $urlRouterProvider.otherwise('/my-carriers');

  // ROUTES
  $stateProvider
    .state(routesConfig.INDEX.base.name, {
      url: routesConfig.INDEX.base.route,
      resolve: {
        user: function (userService) {
          return userService.fetchUserById(1);
        },
        carrierDetails: function (carrierDetailsService, user) {
          return carrierDetailsService.fetchCarrierById(user.carrierId);
        },
        repDetails: function (repDetailsService, carrierDetails) {
          return repDetailsService.fetchRepById(carrierDetails.repId);
        }
      },
      views: {
        'header': {
          template: '<app-header></app-header>',
        },
        'body': {
          template: '<div ui-view></div>'
        },
        'footer': {
          template: '<app-footer></app-footer>',
        }
      }
    })
    .state(routesConfig.INDEX.myCarriers.name, {
      url: routesConfig.INDEX.myCarriers.route,
      template: '<my-carriers></my-carriers>'
    })
    .state(routesConfig.INDEX.myCompany.name, {
      url: routesConfig.INDEX.myCompany.route,
      template: '<my-company></my-company>'
    });
});