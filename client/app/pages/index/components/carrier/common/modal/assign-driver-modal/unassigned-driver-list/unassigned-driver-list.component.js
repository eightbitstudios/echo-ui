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

      this.selectDriver = function(driver) {
        this.selectedDriver = driver;
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
