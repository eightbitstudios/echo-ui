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
        name: 'index.myCarriers.myCompany.drivers',
        route: '/drivers'
      }
    },
    LOGIN: {
      base: {
        name: 'login',
        route: '/'
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
