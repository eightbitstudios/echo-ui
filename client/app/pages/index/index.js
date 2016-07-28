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
  'echo.services.cookie',
  'echo.services.user',
  'templates-app'
]).config(function ($base64, $urlRouterProvider, $stateProvider, routesConfig) {
  $urlRouterProvider.otherwise('/myCarriers');

  // ROUTES
  $stateProvider
    .state(routesConfig.INDEX.base.name, {
      url: routesConfig.INDEX.base.route,
      abstract: true,
      resolve: {
        user: function ($q, cookieService, userService) {
          var jwt = cookieService.getToken();
          
          if(jwt){
            var userObj = userService.mapJwtToUser(jwt);
          	userService.setUser(userObj);
          }

          var user = userService.getUser();
          return $q.when(user);
        },
        repDetails: function (repDetailsService, user) {
          if (_.isFunction(user.isRepAdmin) && !user.isRepAdmin()) {
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
      template: '<my-company carrier-id="$ctrl.carrierId"></my-company>'
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
      template: '<driver-grid carrier-id="$ctrl.carrierId"></driver-grid>'
    });
});