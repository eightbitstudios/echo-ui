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
  'echo.services.userProfile',
  'templates-app'
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
      template: '<settings></settings>'
    })
    .state(routesConfig.INDEX.myCarriers.name, {  // #/myCarrier
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
      template: '<carrier rep-details="$ctrl.repDetails" carrier-details="$ctrl.carrierDetails"></carrier>',
      resolve: {
        carrierDetails: function ($stateParams, carrierApi) {
          return carrierApi.fetchCarrierById($stateParams.carrierId);
        }
      },
      controller: function (repDetails, carrierDetails) {
        this.repDetails = repDetails;
        this.carrierDetails = carrierDetails;
      },
      controllerAs: '$ctrl'
    })
    .state(routesConfig.INDEX.dashboard.name, { // #/carrier/:carrierId/dashboard
      url: routesConfig.INDEX.dashboard.route,
      template: '<dashboard carrier-id="$ctrl.carrierId" rep-details="$ctrl.repDetails"></dashboard>',
      data: {
        whiteContainer: true,
        hideTabBar: true
      }
    })
    .state(routesConfig.INDEX.loadManagement.name, { // #/carrier/:carrierId/loadManagement
      url: routesConfig.INDEX.loadManagement.route,
      template: '<load-management carrier-id="$ctrl.carrierId" rep-details="$ctrl.repDetails"></load-management>',
      data: {
        whiteContainer: true
      }
    })
    .state(routesConfig.INDEX.activeLoads.name, { // #/carrier/:carrierId/loadManagement/activeLoads
      url: routesConfig.INDEX.activeLoads.route,
      template: '<active-loads carrier-id="$ctrl.carrierId" rep-details="$ctrl.repDetails"></active-loads>',
      data: {
        name: 'active loads'
      }
    })
    .state(routesConfig.INDEX.unbilledLoads.name, { // #/carrier/:carrierId/loadManagement/unbilled
      url: routesConfig.INDEX.unbilledLoads.route,
      template: '<unbilled-loads carrier-id="$ctrl.carrierId" rep-details="$ctrl.repDetails"></unbilled-loads>',
      data: {
        name: 'unbilled loads'
      }
    })
    .state(routesConfig.INDEX.upcomingLoads.name, { // #/carrier/:carrierId/loadManagement/upcomingLoads
      url: routesConfig.INDEX.upcomingLoads.route,
      template: '<upcoming-loads carrier-id="$ctrl.carrierId" rep-details="$ctrl.repDetails"></upcoming-loads>',
      data: {
        name: 'upcoming loads'
      }
    })
    .state(routesConfig.INDEX.searchLoads.name, { // #/carrier/:carrierId/loadManagement/searchText/:searchText
      url: routesConfig.INDEX.searchLoads.route,
      template: '<search-loads search-text="$ctrl.stateParams.searchText" carrier-id="$ctrl.carrierId" rep-details="$ctrl.repDetails"></search-loads>',
      data: {
        hideTabBar: true
      }
    })
    .state(routesConfig.INDEX.loadDetails.name, { // #/carrier/:carrierId/loadManagement/loadDetails/:loadId
      url: routesConfig.INDEX.loadDetails.route,
      template: '<load-details load-id="$ctrl.stateParams.loadId" rep-details="$ctrl.repDetails" carrier-id="$ctrl.carrierId" load-details="$ctrl.loadDetails"></load-details>',
      controller: function($stateParams, repDetails, loadDetails){
        this.repDetails = repDetails;
        this.loadDetails = loadDetails;
        this.carrierId = $stateParams.carrierId;
      },
      controllerAs: '$ctrl',
      data: {
        hideTabBar: true,
        whiteContainer: false
      }, 
      resolve: {
        loadDetails: function(loadsApi, $stateParams) {
          var loadId = $stateParams.loadId;
          return loadsApi.fetchLoadDetails(loadId);
        }
      }
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
      template: '<driver-grid carrier-id="$ctrl.carrierId"></driver-grid>',
      data: {
        whiteContainer: true
      }
    })
    .state(routesConfig.INDEX.myCompanyDriverProfile.name, {  // #/carrier/:carrierId/myCompany/drivers/:driverId
      url: routesConfig.INDEX.myCompanyDriverProfile.route,
      template: '<my-company-driver-profile carrier-id="$ctrl.carrierId"></my-company-driver-profile>',
      data: {
        hideTabBar: true
      }
    });
});