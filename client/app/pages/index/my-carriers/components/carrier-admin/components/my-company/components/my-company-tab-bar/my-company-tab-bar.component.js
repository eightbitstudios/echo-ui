angular.module('echo.index.myCarriers.carrierAdmin.myCompany.tabBar', [
  'echo.config.routes',
  'echo.components.tabBar'
])
  .component('myCompanyTabBar', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/components/my-company-tab-bar/my-company-tab-bar.template.html',
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
