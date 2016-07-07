'use strict';

angular.module('echo.components.header', [
  'echo.components.eyeBrowNav',
  'echo.services.user',
  'echo.services.carrierDetails',
  'echo.services.repDetails'
]).component('appHeader', {
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function(carrierDetailsService, repDetailsService, userService) {
    this.carrierDetails = carrierDetailsService.getCarrierDetails();
    this.repDetails = repDetailsService.getRepDetails();
    this.user = userService.getUser();
  }
});