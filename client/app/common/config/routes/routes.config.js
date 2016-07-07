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
      myCompany: {
        name: 'index.myCarriers.myCompany',
        route:'/my-company'
      }
    }
  });
