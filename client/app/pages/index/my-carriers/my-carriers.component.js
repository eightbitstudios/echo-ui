angular.module('echo.index.myCarriers', [
  'echo.services.carrierDetails',
  'echo.index.myCarriers.allCarriers',
  'echo.index.myCarriers.carrierDetails',
  'echo.index.myCarriers.driverList',
  'echo.services.repDetails',
  'echo.services.user'
]).component('myCarriers', {
  templateUrl: 'app/pages/index/my-carriers/my-carriers.template.html',
  controller: function (carrierDetailsService, userService) {
    this.user = userService.getUser();
    this.carrierDetails = carrierDetailsService.getCarrierDetails();
  }
});
