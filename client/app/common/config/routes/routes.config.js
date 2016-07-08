angular.module('echo.config.routesConfig', [])
  .constant('routesConfig', {
    INDEX: {
      base: {
        name: 'index',
        route: '/'
      },
      myCarriers: {
        name: 'index.myCarriers',
        route:'my-carriers'
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
