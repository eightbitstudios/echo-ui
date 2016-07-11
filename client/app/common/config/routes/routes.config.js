angular.module('echo.config.routesConfig', [])
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
        route:'/:id?isRepAdmin'
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
