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
  'echo.index.termsAndConditions'
]).config(function ($base64, $urlRouterProvider, $stateProvider, routesConfig, RolesEnum) {

  // ROUTES
  $stateProvider
    .state(routesConfig.INDEX.base.name, {
      url: routesConfig.INDEX.base.route,
      data: {
        auth: true
      },
      resolve: {
        user: function ($q, cookieService, userProfileService) {
          var jwt = cookieService.getToken();

          if (jwt) {
            var userObj = userProfileService.mapJwtToUser(jwt);
            userProfileService.setUser(userObj);
          }

          var user = userProfileService.getUser();
          return $q.when(user);
        },
        repDetails: function (user, repApi) {
          return repApi.fetchRepByCarrierId(user.carrierId);
        }
      },
      views: {
        'header': {
          template: '<app-header rep-details="$ctrl.repDetails"></app-header>',
          controller: function (repDetails) {
            this.repDetails = repDetails;
          },
          controllerAs: '$ctrl'
        },
        'body': {
          template: '<div ui-view></div>'
        },
        'footer': {
          template: '<app-footer rep-details="$ctrl.repDetails"></app-footer>',
          controller: function (repDetails) {
            this.repDetails = repDetails;
          },
          controllerAs: '$ctrl'
        }
      }

    })
    .state(routesConfig.INDEX.settings.name, { // #/settings
      url: routesConfig.INDEX.settings.route,
      component: 'settings'
    })
    .state(routesConfig.INDEX.myCarriers.name, {  // #/myCarrier
      url: routesConfig.INDEX.myCarriers.route,
      component: 'my-carriers',
      data: {
        role: RolesEnum.ECHO_REP,
        reroute: routesConfig.INDEX.carrier.name
      }
    })
    .state(routesConfig.INDEX.myCarriersDetails.name, { // #/myCarrier/:carrierId
      url: routesConfig.INDEX.myCarriersDetails.route,
      component: 'carrier-details'
    })
    .state(routesConfig.INDEX.carrier.name, { // #/carrier/:carrierId
      url: routesConfig.INDEX.carrier.route,
      component: 'carrier',
      resolve: {
        carrierId: function($stateParams) {
          return $stateParams.carrierId;
        },
        carrierDetails: function (carrierId, carrierApi) {
          return carrierApi.fetchCarrierById(carrierId);
        }
      }
    })
    .state(routesConfig.INDEX.dashboard.name, { // #/carrier/:carrierId/dashboard
      url: routesConfig.INDEX.dashboard.route,
      component: 'dashboard',
      data: {
        whiteContainer: true,
        hideTabBar: true
      }
    })
    .state(routesConfig.INDEX.loadManagement.name, { // #/carrier/:carrierId/loadManagement
      url: routesConfig.INDEX.loadManagement.route,
      component: 'load-management',
      data: {
        whiteContainer: true
      }
    })
    .state(routesConfig.INDEX.activeLoads.name, { // #/carrier/:carrierId/loadManagement/activeLoads
      url: routesConfig.INDEX.activeLoads.route,
      component: 'active-loads',
      data: {
        name: 'active loads'
      }
    })
    .state(routesConfig.INDEX.unbilledLoads.name, { // #/carrier/:carrierId/loadManagement/unbilled
      url: routesConfig.INDEX.unbilledLoads.route,
      component: 'unbilled-loads',
      data: {
        name: 'unbilled loads'
      }
    })
    .state(routesConfig.INDEX.upcomingLoads.name, { // #/carrier/:carrierId/loadManagement/upcomingLoads
      url: routesConfig.INDEX.upcomingLoads.route,
      component: 'upcoming-loads',
      data: {
        name: 'upcoming loads'
      }
    })
    .state(routesConfig.INDEX.searchLoads.name, { // #/carrier/:carrierId/loadManagement/searchText/:searchText
      url: routesConfig.INDEX.searchLoads.route,
      component: 'search-loads',
      data: {
        hideTabBar: true
      },
      resolve: {
        searchText: function($stateParams) {
          return $stateParams.searchText;
        }
      }
    })
    .state(routesConfig.INDEX.loadDetails.name, { // #/carrier/:carrierId/loadManagement/loadDetails/:loadId
      url: routesConfig.INDEX.loadDetails.route,
      component: 'load-details',
      data: {
        hideTabBar: true,
        whiteContainer: false
      },
      resolve: {
        loadId: function($stateParams) {
          return $stateParams.loadId;
        }
      }
    })
    .state(routesConfig.INDEX.myCompany.name, { // #/carrier/:carrierId/myCompany
      url: routesConfig.INDEX.myCompany.route,
      component: 'my-company'
    })
    .state(routesConfig.INDEX.myCompanyUsers.name, {  // #/carrier/:carrierId/myCompany/portalUsers
      url: routesConfig.INDEX.myCompanyUsers.route,
      component: 'my-company-portal-users'
    })
    .state(routesConfig.INDEX.myCompanyDrivers.name, {  // #/carrier/:carrierId/myCompany/drivers
      url: routesConfig.INDEX.myCompanyDrivers.route,
      component: 'driver-grid',
      data: {
        whiteContainer: true
      }
    })
    .state(routesConfig.INDEX.myCompanyDriverProfile.name, {  // #/carrier/:carrierId/myCompany/drivers/:driverId
      url: routesConfig.INDEX.myCompanyDriverProfile.route,
      component: 'my-company-driver-profile',
      resolve: {
        driverId: function($stateParams) {
          return $stateParams.driverId;
        }
      },
      data: {
        hideTabBar: true
      }
    })
    .state(routesConfig.INDEX.termsAndConditions.name, { // #/termsAndConditions
      url: routesConfig.INDEX.termsAndConditions.route,
      component: 'terms-and-conditions'
    });
});
