angular.module('echo.index.myCarriers.driverList', [])
  .component('driverList', {
    templateUrl: 'app/pages/index/my-carriers/components/driver-list/driver-list.template.html',
    bindings: {
      driverCount: '<',
      driverRoute: '<',
      carrierId: '<'
    },
    controller: function ($state, routesConfig) {
      var that = this;

      that.addDriverHandler = function() {
        $state.go(routesConfig.INDEX.myCompanyDriverProfile.name, {carrierId: that.carrierId});
      };
    }
  });
