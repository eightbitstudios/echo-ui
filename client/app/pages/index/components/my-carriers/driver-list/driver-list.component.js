angular.module('echo.index.myCarriers.driverList', [])
  .component('driverList', {
    templateUrl: 'driver-list.component.html',
    bindings: {
      driverCount: '<',
      driverRoute: '<',
      carrierId: '<',
      addDriverHandler: '&'
    }
  });
