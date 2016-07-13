angular.module('echo.index.myCarriers.carrierAdmin.myCompany', [
  'echo.config.routes',
  'echo.components.tabBar',
  'echo.index.myCarriers.carrierAdmin.myCompany.portalUsers',
  'echo.index.myCarriers.carrierAdmin.myCompany.drivers'
])
  .component('myCompany', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/my-company.template.html',
    bindings: {},
    controller: function (routesConfig) {
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
    }
  });
