'use strict';
angular.module('echo.index', [
  'echo',
  'ui.router',
  'echo.config',
  'echo.index.controller',
  'echo.index.myCarriers',
  'echo.index.settings',
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
      abstract: true,
      resolve: {
        user: function (userService) {
          return userService.fetchUserById(1);
        },
        carrierDetails: function (carrierDetailsService, user) {
          if (!user.isRepAdmin()) {
            return carrierDetailsService.fetchCarrierById(user.carrierId);
          }
        },
        repDetails: function (repDetailsService, user) {
          if (!user.isRepAdmin()) {
            return repDetailsService.fetchRepByCarrierId(user.carrierId);
          }
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
    .state(routesConfig.INDEX.settings.name, {
      url: routesConfig.INDEX.settings.route,
      template: '<settings></settings>'
    })
    .state(routesConfig.INDEX.myCarriers.name, {
      url: routesConfig.INDEX.myCarriers.route,
      template: '<my-carriers></my-carriers>'
    })
    .state(routesConfig.INDEX.myCompany.name, {
      url: routesConfig.INDEX.myCompany.route,
      template: '<my-company></my-company>',
    })
    .state(routesConfig.INDEX.dashboard.name, {
      url: routesConfig.INDEX.dashboard.route,
      template: '<dashboard></dashboard>'
    })
    .state(routesConfig.INDEX.myCarriersDetails.name, {
      url: routesConfig.INDEX.myCarriersDetails.route,
      template: '<carrier-details></carrier-details>'
    });
});