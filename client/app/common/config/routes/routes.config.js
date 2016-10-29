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
        route:'carrier/:carrierId'
      },
      dashboard: {
        name: 'index.carrier.dashboard',
        route:'/dashboard'
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
      loadDetails: {
        name: 'index.carrier.loadManagement.loadDetails',
        route: '/loadDetails/:loadId'
      },
      searchLoads: {
        name: 'index.carrier.loadManagement.searchLoads',
        route: '/searchLoads/{searchText}'
      },
      myCompany: {
        name: 'index.carrier.myCompany',
        route:'/myCompany',
        url: _.template('/#/carrier/${carrierId}/myCompany')
      },
      myCompanyUsers: {
        name: 'index.carrier.myCompany.portalUsers',
        route: '/portalUsers'
      },
      myCompanyDrivers: {
        name: 'index.carrier.myCompany.drivers',
        route: '/drivers'
      },
      myCompanyDriverProfile: {
        name: 'index.carrier.myCompany.driverProfile',
        route: '/drivers/{driverId}'
      }
    },
    LOGIN: {
      base: {
        name: 'login',
        route: '/login.html',
        url: _.template('/login.html#/?redirect=${redirect}')
      },
      signIn: {
        name: 'login.signIn',
        route: '/?invalidToken'
      },
      createPassword: {
        name: 'login.createPassword',
        route: '/createPassword?validationToken&username'
      },
      forgotPassword: {
        name: 'login.forgotPassword',
        route: '/forgotPassword'
      }
    }
  });
