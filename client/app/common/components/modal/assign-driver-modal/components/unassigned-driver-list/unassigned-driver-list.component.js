angular.module('echo.components.modal.assignDriver.unassignedDriverList', [
    'echo.api.loads',
    'echo.filters.phoneNumber',
    'echo.filters.fullName'
  ])
  .component('unassignedDriverList', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/unassigned-driver-list/unassigned-driver-list.template.html',
    bindings: {
      loadId: '<',
      carrierId: '<',
      selectedDriver: '='
    },
    controller: function(loadsApi) {

      this.selectDriver = function(driver) {
        this.selectedDriver = driver;
      };

      this.deselectDriver = function() {
        this.selectedDriver = null;
      };

      this.$onInit = function() {
        var that = this;

        that.showLoading = true;
        loadsApi.fetchUnassignedDriversByLoadId(that.loadId, that.carrierId).then(function(data) {
          that.drivers = data.drivers;
        }).finally(function() {
          that.showLoading = false;
        });
      };
    }
  });