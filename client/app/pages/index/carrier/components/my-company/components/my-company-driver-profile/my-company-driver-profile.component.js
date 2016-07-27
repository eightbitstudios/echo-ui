angular.module('echo.index.carrier.myCompany.driverProfile', [
  'echo.components.driverProfile',
  'echo.components.usage',
  'echo.components.assignments'
])
  .component('myCompanyDriverProfile', {
    templateUrl: 'app/pages/index/carrier/components/my-company/components/my-company-driver-profile/my-company-driver-profile.template.html',
    bindings: {
      carrierId: '<'
    },
    controller: function () {
    }
  });
