angular.module('echo.config.routes', [])
  .constant('routesConfig', {
    INDEX: {
      base: {
        name: 'index',
        route: '/'
      },
      settings: {
        name: 'index.settings',
        route:'settings'
      },
      myCarriers: {
        name: 'index.myCarriers',
        route:'my-carriers'
      },
      myCarriersDetails: {
        name: 'index.myCarriers.details',
        route:'/:carrierId?isRepAdmin'
      },
      carrierDetailsPortalUser: {
        name: 'index.myCarriers.details.portalUser',
        route:'/portal-user/{userId}'
      },
      dashboard: {
        name: 'index.myCarriers.dashboard',
        route:'/dashboard'
      },
      myCompany: {
        name: 'index.myCarriers.myCompany',
        route:'/my-company'
      }
    }
  });
