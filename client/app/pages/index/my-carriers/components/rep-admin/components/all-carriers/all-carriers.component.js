angular.module('echo.index.myCarriers.repAdmin.allCarriers', [
  'echo.services.carrier'
])
  .component('allCarriers', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/all-carriers/all-carriers.template.html',
    bindings: {},
    controller: function (carrierService) {
      var that = this;
      carrierService.fetchCarriers().then(function (carriers) {
        that.carrierList = _(carriers).groupBy(function (carrier) {
          return carrier.name.charAt(0);
        }).map(function (value, prop) {
          return {
            values: value,
            letter: prop
          };
        }).value();
      });
    }
  });
