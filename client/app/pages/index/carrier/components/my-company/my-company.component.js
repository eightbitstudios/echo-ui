angular.module('echo.index.carrier.myCompany', [
  'echo.config.routes',
  'echo.components.tabBar',
  'echo.index.carrier.myCompany.portalUsers',
  'echo.index.carrier.myCompany.drivers',
  'echo.index.carrier.myCompany.userProfile'
])
  .component('myCompany', {
    templateUrl: 'app/pages/index/carrier/components/my-company/my-company.template.html',
    bindings: {},
    controller: function ($state, routesConfig) {
      var that = this;
      
      that.tabItems = [{
        title: 'Portal Users',
        link: routesConfig.INDEX.myCompanyUsers.name,
        icon: 'icon-portal-user'
      },{
        title: 'Drivers',
        link: routesConfig.INDEX.myCompanyDrivers.name,
        icon: 'icon-driver'
      }];

      if($state.current.name === routesConfig.INDEX.myCompany.name){
        $state.go(routesConfig.INDEX.myCompanyUsers.name);
      }
    }
  });
