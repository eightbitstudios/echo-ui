'use strict';
angular.module('echo.index', [
  'echo',
  'ui.router',
  'echo.config',
  'echo.directives.echoIcon',
  'echo.index.controller',
  'echo.index.myCarriers',
  'echo.index.settings',
  'echo.enums.roles',
  'echo.index.carrier',
  'echo.components.header',
  'echo.components.footer',
  'echo.api.rep',
  'echo.api.carrier',
  'echo.index.carrier.myCompany.driverProfile',
  'echo.services.cookie',
  'echo.services.googleMapsApi',
  'echo.services.userProfile',
  'templates-app',
  'echo.action',
  'echo.store'
]).config(function($base64, $urlRouterProvider, $stateProvider, routesConfig, RolesEnum) {

  // ROUTES
  $stateProvider
    .state(routesConfig.INDEX.base.name, {
      url: routesConfig.INDEX.base.route,
      data: {
        auth: true
      },
      views: {
        'header': {
          template: '<app-header/>'
        },
        'body': {
          template: '<div ui-view></div>'
        },
        'footer': {
          template: '<app-footer/>'
        }
      }

    })
    .state(routesConfig.INDEX.settings.name, { // #/settings
      url: routesConfig.INDEX.settings.route,
      template: '<settings></settings>'
    })
    .state(routesConfig.INDEX.myCarriers.name, { // #/myCarrier
      url: routesConfig.INDEX.myCarriers.route,
      template: '<my-carriers></my-carriers>',
      data: {
        role: RolesEnum.ECHO_REP,
        reroute: routesConfig.INDEX.carrier.name
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
      template: '<dashboard></dashboard>',
      data: {
        whiteContainer: true,
        hideTabBar: true
      }
    })
    .state(routesConfig.INDEX.loadManagement.name, { // #/carrier/:carrierId/loadManagement
      url: routesConfig.INDEX.loadManagement.route,
      template: '<load-management></load-management>',
      data: {
        whiteContainer: true
      }
    })
    .state(routesConfig.INDEX.activeLoads.name, { // #/carrier/:carrierId/loadManagement/activeLoads
      url: routesConfig.INDEX.activeLoads.route,
      template: '<active-loads></active-loads>',
      data: {
        name: 'active loads',
        isActiveLoads: true
      }
    })
    .state(routesConfig.INDEX.unbilledLoads.name, { // #/carrier/:carrierId/loadManagement/unbilled
      url: routesConfig.INDEX.unbilledLoads.route,
      template: '<unbilled-loads></unbilled-loads>',
      data: {
        name: 'unbilled loads'
      }
    })
    .state(routesConfig.INDEX.upcomingLoads.name, { // #/carrier/:carrierId/loadManagement/upcomingLoads
      url: routesConfig.INDEX.upcomingLoads.route,
      template: '<upcoming-loads></upcoming-loads>',
      data: {
        name: 'upcoming loads'
      }
    })
    .state(routesConfig.INDEX.searchLoads.name, { // #/carrier/:carrierId/loadManagement/searchText/:searchText
      url: routesConfig.INDEX.searchLoads.route,
      template: '<search-loads></search-loads>',
      data: {
        hideTabBar: true
      }
    })
    .state(routesConfig.INDEX.loadDetails.name, { // #/carrier/:carrierId/loadManagement/loadDetails/:loadId
      url: routesConfig.INDEX.loadDetails.route,
      template: '<load-details></load-details>',
      data: {
        hideTabBar: true,
        whiteContainer: false
      }
    })
    .state(routesConfig.INDEX.myCompany.name, { // #/carrier/:carrierId/myCompany
      url: routesConfig.INDEX.myCompany.route,
      template: '<my-company></my-company>'
    })
    .state(routesConfig.INDEX.myCompanyUsers.name, { // #/carrier/:carrierId/myCompany/portalUsers
      url: routesConfig.INDEX.myCompanyUsers.route,
      template: '<my-company-portal-users></my-company-portal-users>'
    })
    .state(routesConfig.INDEX.myCompanyDrivers.name, { // #/carrier/:carrierId/myCompany/drivers
      url: routesConfig.INDEX.myCompanyDrivers.route,
      template: '<driver-grid></driver-grid>',
      data: {
        whiteContainer: true
      }
    })
    .state(routesConfig.INDEX.myCompanyDriverProfile.name, { // #/carrier/:carrierId/myCompany/drivers/:driverId
      url: routesConfig.INDEX.myCompanyDriverProfile.route,
      template: '<my-company-driver-profile></my-company-driver-profile>',
      data: {
        hideTabBar: true
      }
    });
}).run(function(store$, userActions, cookieService, userProfileService) {
  var jwt = cookieService.getToken();
  if (jwt) {
    store$.dispatch({
      type: userActions.SET_USER,
      payload: userProfileService.mapJwtToUser(jwt)
    });
  }
});