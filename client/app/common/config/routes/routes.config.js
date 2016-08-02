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
        route: 'settings'
      },
      myCarriers: {
        name: 'index.myCarriers',
        route: 'myCarriers',
        url: '/#/myCarriers'
      },
      myCarriersDetails: {
        name: 'index.myCarriers.details',
        route: '/:carrierId'
      },
      carrier: {
        name: 'index.carrier',
        route: 'carrier/:carrierId?isCarrierAdmin'
      },
      dashboard: {
        name: 'index.carrier.dashboard',
        route: '/dashboard?isCarrierAdmin'
      },
      loadManagement: {
        name: 'index.carrier.loadManagement',
        route: '/loadManagement'
      },
      activeLoads: {
        name: 'index.carrier.loadManagement.activeLoads',
        route: '/activeLoads'
      },
      unbilledLoads: {
        name: 'index.carrier.loadManagement.unbilledLoads',
        route: '/unbilledLoads'
      },
      upcomingLoads: {
        name: 'index.carrier.loadManagement.upcomingLoads',
        route: '/upcomingLoads'
      },
      myCompany: {
        name: 'index.carrier.myCompany',
        route: '/myCompany?isCarrierAdmin',
        url: _.template('/#/carrier/${carrierId}/myCompany')
      },
      myCompanyUsers: {
        name: 'index.carrier.myCompany.portalUsers',
        route: '/portalUsers?isCarrierAdmin'
      },
      myCompanyDrivers: {
        name: 'index.carrier.myCompany.drivers',
        route: '/drivers?isCarrierAdmin'
      },
      myCompanyDriverProfile: {
        name: 'index.carrier.myCompany.driverProfile',
        route: '/drivers/{driverId}'
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
      },
      forgotPassword: {
        name: 'login.forgotPassword',
        route: '/forgotPassword'
      }
    }
  });
