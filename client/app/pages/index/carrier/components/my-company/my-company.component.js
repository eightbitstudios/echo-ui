angular.module('echo.index.carrier.myCompany', [
    'echo.config.routes',
    'echo.components.tabBar',
    'echo.index.carrier.myCompany.portalUsers',
    'echo.components.driverGrid',
    'echo.index.carrier.myCompany.userProfile'
  ])
  .component('myCompany', {
    templateUrl: 'app/pages/index/carrier/components/my-company/my-company.component.html',
    bindings: {},
    controller: function($stateParams, $state, store$, routesConfig) {
      var that = this;

      that.$onInit = function() {
        var state = store$.getState();

        that.carrierId = state.carrier.carrierId;
        that.routesConfig = routesConfig;
        that.state = $state;


        that.tabItems = [{
          title: 'Portal Users',
          link: routesConfig.INDEX.myCompanyUsers.name,
          icon: 'icon-portal-user'
        }, {
          title: 'Drivers',
          link: routesConfig.INDEX.myCompanyDrivers.name,
          icon: 'icon-driver'
        }];
      };
    }
  });