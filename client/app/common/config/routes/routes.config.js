angular.module('echo.config.routes', [])
  .constant('routesConfig', {
    INDEX: {
      base: {
        name: 'index',
        route: '/',
        url: '/'
      },
      settings: {
        name: 'index.settings',
        route:'settings'
      },
      myCarriers: {
        name: 'index.myCarriers',
        route:'myCarriers',
        url: '/#/myCarriers'
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
        route:'/myCompany'
      },
      myCompanyUsers: {
        name: 'index.carrier.myCompany.portalUsers',
        route: '/portalUsers'
      },      
      myCompanyUsersProfile: {
        name: 'index.carrier.myCompany.profile',
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
      signIn: {
        name: 'login.signIn',
        route: '/?invalidToken'
      },
      createPassword: {
        name: 'login.createPassword',
        route: '/createPassword?validationToken&userId'
      }
    }
  });
