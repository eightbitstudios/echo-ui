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
      removeCallback: '&',
      submitControl: '='
    },
    controller: function(loadsApi) {
      this.$onInit = function() {
        var that = this;
        that.isDriverAlreadyAssigned = false;
        if (that.showStatus) {
          that.showLoading = true;
          loadsApi.fetchDriverStatusByLoadId(that.loadId, that.driver.id).then(function(driverAvailability) {
            that.isDriverAlreadyAssigned = !driverAvailability.isDriverAvailable;
            that.conflictLoadId = driverAvailability.conflictingLoadId;
            that.submitControl = driverAvailability.isDriverAvailable;
          }).finally(function() {
            that.showLoading = false;
          });
        }
      };
    }
  });