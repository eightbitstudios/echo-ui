angular.module('echo.components.modal.assignDriver.selectedDriver', [
  'echo.filters.phoneNumber'
])
  .component('selectedDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/selected-driver/selected-driver.template.html',
    bindings: {
      driver: '<',
      loadId: '<',
      removeCallback: '&'
    },
    controller: function (loadsApi) {
      var that = this;

      that.$onInit = function () {
        that.isDriverAlreadyAssigned = false;
        that.showLoading = true;
        loadsApi.fetchDriverStatusByLoadId(that.loadId, that.driver.id).then(function () {
          that.isDriverAlreadyAssigned = false;
        }).finally(function () {
          that.showLoading = false;
        });
      };
    }
  });