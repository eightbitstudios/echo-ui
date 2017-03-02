angular.module('echo.index.myCarriers.driverList', [])
  .component('driverList', {
    templateUrl: 'app/pages/index/my-carriers/components/driver-list/driver-list.component.html',
    bindings: {
      driverCount: '<',
      driverRoute: '<',
      carrierId: '<',
      addDriverHandler: '&'
    }
  });
