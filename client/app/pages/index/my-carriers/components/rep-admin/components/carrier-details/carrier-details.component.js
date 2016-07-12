angular.module('echo.index.myCarriers.repAdmin.carrierDetails', [
  'echo.index.myCarriers.repAdmin.driverList',
  'echo.services.carrier',
  'echo.enums.carrier',
  'echo.components.portalUsers'
])
  .component('carrierDetails', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/carrier-details/carrier-details.template.html',
    bindings: {},
    controller: function ($stateParams, carrierService, carrierEnum) {
      var that = this;

      carrierService.fetchCarrierById($stateParams.id).then(function (carrier) {
        that.carrier = carrier;

        if (that.carrier.status !== carrierEnum.STATUS.INACTIVE) {
          carrierService.fetchCarrierPortalUsers(carrier.id).then(function (portalUsers) {
            that.portalUsers = portalUsers;
          });

          carrierService.fetchCarrierDriverCount(carrier.id).then(function (driverCount) {
            that.driverCount = driverCount.count;
          });
        }
      });
    }
  });
