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
        route:'myCarriers'
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
        name: 'index.myCarriers.myCompany',
        route:'/myCompany'
      },
      myCompanyUsers: {
        name: 'index.myCarriers.myCompany.portalUsers',
        route: '/portalUsers'
      },      
      myCompanyUsersProfile: {
        name: 'index.myCarriers.myCompany.profile',
        route: '/portalUsers/{userId}'
      },
      myCompanyDrivers: {
        name: 'index.carrier.myCompany.drivers',
        route: '/drivers'
      }
    },
    LOGIN: {
      base: {
        name: 'login',
        route: '/login.html'
      },
      start: {
        name: 'login.start',
        route: '/?invalidToken'
      },
      createPassword: {
        name: 'login.createPassword',
        route: '/createPassword?validationToken&userId'
      }
    }
  });
