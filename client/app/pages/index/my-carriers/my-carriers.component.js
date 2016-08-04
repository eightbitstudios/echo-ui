angular.module('echo.index.myCarriers', [
  'echo.index.myCarriers.allCarriers',
  'echo.index.myCarriers.carrierDetails',
  'echo.index.myCarriers.driverList',
  'echo.services.user'
]).component('myCarriers', {
  templateUrl: 'app/pages/index/my-carriers/my-carriers.template.html',
  controller: function (userService) {
    this.user = userService.getUser();
  }
});
