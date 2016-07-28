angular.module('echo.index.myCarriers.driverList', [])
  .component('driverList', {
    templateUrl: 'app/pages/index/my-carriers/components/driver-list/driver-list.template.html',
    bindings: {
      driverCount: '<',
      driverRoute: '<',
      carrierId: '<'
    },
    controller: function () {}
  });
