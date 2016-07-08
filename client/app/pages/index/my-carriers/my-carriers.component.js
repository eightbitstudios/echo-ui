angular.module('echo.index.myCarriers', [
  'echo.index.myCarriers.carrierAdmin',
  'echo.index.myCarriers.repAdmin',
  'echo.services.carrierDetails',
  'echo.services.repDetails',
  'echo.services.user'
]).component('myCarriers', {
  templateUrl: 'app/pages/index/my-carriers/my-carriers.template.html',
  controller: function (carrierDetailsService, repDetailsService, userService) {
    this.user = userService.getUser();
    this.carrierDetails = carrierDetailsService.getCarrierDetails();
    this.repDetails = repDetailsService.getRepDetails();
  }
});
