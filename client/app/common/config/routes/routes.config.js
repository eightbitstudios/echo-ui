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
        route: '/activeLoads',
        title: 'Active Loads'
      },
      unbilledLoads: {
        name: 'index.carrier.loadManagement.unbilledLoads',
        route: '/unbilledLoads',
        title: 'Unbilled Loads'
      },
      upcomingLoads: {
        name: 'index.carrier.loadManagement.upcomingLoads',
        route: '/upcomingLoads',
        title: 'Upcoming Loads'
      },
      loadDetails: {
        name: 'index.carrier.loadManagement.loadDetails',
        route: '/loadDetails/:loadId?previous'
      },
      searchLoads: {
        name: 'index.carrier.loadManagement.searchLoads',
        route: '/searchLoads?searchText&previous'
      },
      invoicing: {
        name: 'index.carrier.invoicing',
        route: '/invoicing'
      },
      activeInvoices: {
        name: 'index.carrier.invoicing.activeInvoices',
        route: '/activeInvoices',
        title: 'Active Invoices'
      },
      archivedInvoices: {
        name: 'index.carrier.invoicing.archivedInvoices',
        route: '/archivedInvoices',
        title: 'Archived Invoices'
      },
      searchInvoices: {
        name: 'index.carrier.invoicing.searchInvoices',
        route: '/searchInvoices?searchText'
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
        url: '/login.html#/',
        redirectUrl: _.template('/login.html#/?redirect=${redirect}')
      },
      signIn: {
        name: 'login.signIn',
        route: '/?invalidToken'
      },
      createPassword: {
        name: 'login.createPassword',
        route: '/createPassword?validationToken&userId'
      },
      resetPassword: {
        name: 'login.resetPassword',
        route: '/resetPassword?validationToken&userId'
      },
      forgotPassword: {
        name: 'login.forgotPassword',
        route: '/forgotPassword'
      }
    }
  });
