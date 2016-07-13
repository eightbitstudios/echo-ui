angular.module('echo.index.myCarriers.carrierAdmin.myCompany', [
  'echo.config.routes',
  'echo.components.tabBar',
  'echo.index.myCarriers.carrierAdmin.myCompany.portalUsers',
  'echo.index.myCarriers.carrierAdmin.myCompany.drivers',
  'echo.index.myCarriers.carrierAdmin.myCompany.userProfile',
  'echo.index.myCarriers.carrierAdmin.myCompany.tabBar'
])
  .component('myCompany', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/my-company.template.html',
    bindings: {},
    controller: function ($state, routesConfig) {

      if($state.current.name === routesConfig.INDEX.myCompany.name){
        $state.go(routesConfig.INDEX.myCompanyUsers.name);
      }
    }
  });
