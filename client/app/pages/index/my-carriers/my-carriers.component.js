angular.module('echo.index.myCarriers', [
  'echo.index.myCarriers.allCarriers',
  'echo.index.myCarriers.carrierDetails',
  'echo.index.myCarriers.driverList',
  'echo.services.userProfile'
]).component('myCarriers', {
  templateUrl: 'app/pages/index/my-carriers/my-carriers.component.html'
});