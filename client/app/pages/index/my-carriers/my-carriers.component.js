angular.module('echo.index.myCarriers', [
  'echo.index.myCarriers.allCarriers',
  'echo.index.myCarriers.carrierDetails',
  'echo.index.myCarriers.driverList',
  'echo.services.userProfile'
]).component('myCarriers', {
  templateUrl: 'app/pages/index/my-carriers/my-carriers.template.html',
  controller: function(userProfileService) {
    this.$onInit = function() {
      this.user = userProfileService.getUser();
    };
  }
});