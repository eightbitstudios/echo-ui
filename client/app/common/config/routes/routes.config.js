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
      carrier: {
        name: 'index.carrier',
        route:'carrier/:carrierId'
      },
      myCarriersDetails: {
        name: 'index.myCarriers.details',
        route:'/:carrierId'
      },
      dashboard: {
        name: 'index.carrier.dashboard',
        route:'/dashboard'
      },
      myCompany: {
        name: 'index.carrier.myCompany',
        route:'/my-company'
      },
      myCompanyUsers: {
        name: 'index.carrier.myCompany.portalUsers',
        route: '/portal-users'
      },      
      myCompanyUsersProfile: {
        name: 'index.carrier.myCompany.profile',
        route: '/portal-users/{userId}'
      },
      myCompanyDrivers: {
        name: 'index.carrier.myCompany.drivers',
        route: '/drivers'
      }
    }
  });
