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
  'echo.index.carrier.myCompany.driverProfile',
  'echo.index.resolvers.base',
  'echo.index.resolvers.carrier',
  'echo.index.resolvers.loadManagement',
  'echo.index.resolvers.loadDetails',
  'echo.index.resolvers.driverProfile',
  'echo.index.resolvers.carrierDetails',
  'echo.index.decorators.routeSettings',
  'templates-app'
]).config(function ($base64, $urlRouterProvider, $stateProvider, routesConfig,
  baseResolverProvider, carrierResolverProvider, loadManagementResolverProvider, loadDetailsResolverProvider,
  driverProfileResolverProvider, carrierDetailsResolverProvider, RouteSettingsDecoratorProvider) {

  var RouteSettingsDecorator = RouteSettingsDecoratorProvider.$get();
  // ROUTES
  $stateProvider
    .state(routesConfig.INDEX.base.name, {
      url: routesConfig.INDEX.base.route,
      data: new RouteSettingsDecorator().authenticationRequired(),
      resolve: baseResolverProvider.$get(),
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
      data: new RouteSettingsDecorator().echoRepOnly()
    })
    .state(routesConfig.INDEX.myCarriersDetails.name, { // #/myCarrier/:carrierId
      url: routesConfig.INDEX.myCarriersDetails.route,
      component: 'carrier-details',
      resolve: carrierDetailsResolverProvider.$get()
    })
    .state(routesConfig.INDEX.carrier.name, { // #/carrier/:carrierId
      url: routesConfig.INDEX.carrier.route,
      component: 'carrier',
      resolve: carrierResolverProvider.$get()
    })
    .state(routesConfig.INDEX.dashboard.name, { // #/carrier/:carrierId/dashboard
      url: routesConfig.INDEX.dashboard.route,
      component: 'dashboard',
      data: new RouteSettingsDecorator().showWhiteContainer().setTabBarHidden()
    })
    .state(routesConfig.INDEX.loadManagement.name, { // #/carrier/:carrierId/loadManagement
      url: routesConfig.INDEX.loadManagement.route,
      component: 'load-management',
      resolve: loadManagementResolverProvider.$get(),
      data: new RouteSettingsDecorator().showWhiteContainer()
    })
    .state(routesConfig.INDEX.activeLoads.name, { // #/carrier/:carrierId/loadManagement/activeLoads
      url: routesConfig.INDEX.activeLoads.route,
      component: 'active-loads',
      data: new RouteSettingsDecorator().routeName('active loads')
    })
    .state(routesConfig.INDEX.unbilledLoads.name, { // #/carrier/:carrierId/loadManagement/unbilled
      url: routesConfig.INDEX.unbilledLoads.route,
      component: 'unbilled-loads',
      data: new RouteSettingsDecorator().routeName('unbilled loads')
    })
    .state(routesConfig.INDEX.upcomingLoads.name, { // #/carrier/:carrierId/loadManagement/upcomingLoads
      url: routesConfig.INDEX.upcomingLoads.route,
      component: 'upcoming-loads',
      data: new RouteSettingsDecorator().routeName('upcoming loads')
    })
    .state(routesConfig.INDEX.searchLoads.name, { // #/carrier/:carrierId/loadManagement/searchText/:searchText
      url: routesConfig.INDEX.searchLoads.route,
      component: 'search-loads',
      data: new RouteSettingsDecorator().setTabBarHidden()
    })
    .state(routesConfig.INDEX.loadDetails.name, { // #/carrier/:carrierId/loadManagement/loadDetails/:loadId
      url: routesConfig.INDEX.loadDetails.route,
      component: 'load-details',
      data: new RouteSettingsDecorator().setTabBarHidden().showDefaultContainer(),
      resolve: loadDetailsResolverProvider.$get()
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
      data: new RouteSettingsDecorator().showWhiteContainer(),
    })
    .state(routesConfig.INDEX.myCompanyDriverProfile.name, {  // #/carrier/:carrierId/myCompany/drivers/:driverId
      url: routesConfig.INDEX.myCompanyDriverProfile.route,
      component: 'my-company-driver-profile',
      resolve: driverProfileResolverProvider.$get(),
      data: new RouteSettingsDecorator().setTabBarHidden()
    });
});