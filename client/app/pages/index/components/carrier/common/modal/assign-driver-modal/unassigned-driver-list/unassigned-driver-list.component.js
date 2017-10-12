angular.module('echo.components.modal.assignDriver.unassignedDriverList', [
    'echo.api.loads',
    'echo.filters.phoneNumber',
    'echo.filters.fullName',
    'echo.components.radioButton'
  ])
  .component('unassignedDriverList', {
    templateUrl: 'unassigned-driver-list.component.html',
    bindings: {
      loadId: '<',
      carrierId: '<',
      selectedDriver: '='
    },
    controller: function(loadsApi) {

      this.toggleDriver = function(driver) {
        if (this.isSelected(driver)){
          this.selectedDriver = null;
        } else {
          this.selectedDriver = driver;
        }
      };

      this.isSelected = function(driver) {
        return driver && this.selectedDriver && this.selectedDriver.id === driver.id;
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
