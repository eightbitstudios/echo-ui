'use strict';
angular.module('echo.index', [
  'echo',
  'ui.router',
  'echo.config',
  'echo.directives.echoIcon',
  'echo.index.controller',
  'echo.index.myCarriers',
  'echo.index.settings',
  'echo.index.carrier',
  'echo.components.header',
  'echo.components.footer',
  'echo.services.repDetails',
  'echo.services.carrierDetails',
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
          return userService.fetchUserById();
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
    .state(routesConfig.INDEX.carrier.name, {
      url: routesConfig.INDEX.carrier.route,
      template: '<carrier></carrier>'
    })
    .state(routesConfig.INDEX.myCompany.name, {
      url: routesConfig.INDEX.myCompany.route,
      template: '<my-company></my-company>'
    })
    .state(routesConfig.INDEX.dashboard.name, {
      url: routesConfig.INDEX.dashboard.route,
      template: '<dashboard></dashboard>'
    })
    .state(routesConfig.INDEX.myCarriersDetails.name, {
      url: routesConfig.INDEX.myCarriersDetails.route,
      template: '<carrier-details></carrier-details>'
    })
    .state(routesConfig.INDEX.myCompanyUsers.name, {
      url: routesConfig.INDEX.myCompanyUsers.route,
      template: '<my-company-portal-users></my-company-portal-users>'
    })
    .state(routesConfig.INDEX.myCompanyDrivers.name, {
      url: routesConfig.INDEX.myCompanyDrivers.route,
      template: '<my-company-drivers></my-company-drivers>'
    });
});