angular.module('echo.components.modal.assignDriver.selectedDriver', [
  'echo.filters.phoneNumber',
  'echo.filters.fullName'
])
  .component('selectedDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/selected-driver/selected-driver.template.html',
    bindings: {
      driver: '<',
      loadId: '<',
      showStatus: '<',
      showTitle: '<',
      removeCallback: '&'
    },
    controller: function (loadsApi) {
      var that = this;

      that.$onInit = function () {
        that.isDriverAlreadyAssigned = false;
        if (that.showStatus) {
          that.showLoading = true;
          loadsApi.fetchDriverStatusByLoadId(that.loadId, that.driver.id).then(function (isAvailable) {
            that.isDriverAlreadyAssigned = !isAvailable;
          }).finally(function () {
            that.showLoading = false;
          });
        }
      };
    }
  });