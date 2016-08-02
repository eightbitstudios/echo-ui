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
  'echo.index.carrier.myCompany.driverProfile',
  'echo.services.cookie',
  'echo.services.user',
  'templates-app'
]).config(function ($base64, $urlRouterProvider, $stateProvider, routesConfig) {
  $urlRouterProvider.otherwise('/');

  // ROUTES
  $stateProvider
    .state(routesConfig.INDEX.base.name, {
      url: routesConfig.INDEX.base.route,
      abstract: true,
      data: {
        auth: true
      },
      resolve: {
        user: function ($q, cookieService, userService) {
          var jwt = cookieService.getToken();

          if (jwt) {
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
    .state(routesConfig.INDEX.settings.name, { // #/settings
      url: routesConfig.INDEX.settings.route,
      template: '<settings></settings>'
    })
    .state(routesConfig.INDEX.myCarriers.name, {  // #/myCarrier
      url: routesConfig.INDEX.myCarriers.route,
      template: '<my-carriers></my-carriers>',
      data: {
        role: 'RepAdmin'
      }
    })
    .state(routesConfig.INDEX.myCarriersDetails.name, { // #/myCarrier/:carrierId
      url: routesConfig.INDEX.myCarriersDetails.route,
      template: '<carrier-details></carrier-details>'
    })
    .state(routesConfig.INDEX.carrier.name, { // #/carrier/:carrierId
      url: routesConfig.INDEX.carrier.route,
      template: '<carrier></carrier>'
    })
    .state(routesConfig.INDEX.dashboard.name, { // #/carrier/:carrierId/dashboard
      url: routesConfig.INDEX.dashboard.route,
      template: '<dashboard></dashboard>'
    })
    .state(routesConfig.INDEX.myCompany.name, { // #/carrier/:carrierId/myCompany
      url: routesConfig.INDEX.myCompany.route,
      template: '<my-company carrier-id="$ctrl.carrierId"></my-company>'
    })
    .state(routesConfig.INDEX.myCompanyUsers.name, {  // #/carrier/:carrierId/myCompany/portalUsers
      url: routesConfig.INDEX.myCompanyUsers.route,
      template: '<my-company-portal-users></my-company-portal-users>'
    })
    .state(routesConfig.INDEX.myCompanyDrivers.name, {  // #/carrier/:carrierId/myCompany/drivers
      url: routesConfig.INDEX.myCompanyDrivers.route,
      template: '<driver-grid carrier-id="$ctrl.carrierId"></driver-grid>'
    })
    .state(routesConfig.INDEX.myCompanyDriverProfile.name, {  // #/carrier/:carrierId/myCompany/drivers/:driverId
      url: routesConfig.INDEX.myCompanyDriverProfile.route,
      template: '<my-company-driver-profile carrier-id="$ctrl.carrierId"></my-company-driver-profile>'
    });
});