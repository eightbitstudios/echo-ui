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
      dashboard: {
        name: 'index.myCarriers.dashboard',
        route:'/dashboard'
      },
      myCompany: {
        name: 'index.myCarriers.myCompany',
        route:'/my-company'
      },
      myCompanyUsers: {
        name: 'index.myCarriers.myCompany.portalUsers',
        route: '/portal-users'
      },      
      myCompanyUsersProfile: {
        name: 'index.myCarriers.myCompany.profile',
        route: '/portal-users/:userId'
      },
      myCompanyDrivers: {
        name: 'index.myCarriers.myCompany.drivers',
        route: '/drivers'
      }
    }
  });
