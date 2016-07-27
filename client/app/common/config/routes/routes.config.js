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
      myCarriersDetails: {
        name: 'index.myCarriers.details',
        route:'/:carrierId'
      },
      carrier: {
        name: 'index.carrier',
        route:'carrier/:carrierId?isCarrierAdmin'
      },
      dashboard: {
        name: 'index.carrier.dashboard',
        route:'/dashboard?isCarrierAdmin'
      },
      myCompany: {
        name: 'index.carrier.myCompany',
        route:'/myCompany?isCarrierAdmin'
      },
      myCompanyUsers: {
        name: 'index.carrier.myCompany.portalUsers',
        route: '/portalUsers?isCarrierAdmin'
      },      
      myCompanyUsersProfile: {
        name: 'index.carrier.myCompany.profile',
        route: '/portalUsers/{userId}?isCarrierAdmin'
      },
      myCompanyDrivers: {
        name: 'index.carrier.myCompany.drivers',
        route: '/drivers?isCarrierAdmin'
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
