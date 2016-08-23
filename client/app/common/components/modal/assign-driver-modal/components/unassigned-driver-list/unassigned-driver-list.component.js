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
    controller: function (loadsApi) {
      var that = this;

      that.selectDriver = function (driver) {
        that.selectedDriver = driver;
      };

      that.deselectDriver = function () {
        that.selectedDriver = null;
      };

      that.$onInit = function () {
        that.showLoading = true;
        loadsApi.fetchUnassignedDriversByLoadId(that.loadId, that.carrierId).then(function (drivers) {
          that.drivers = drivers;
        }).finally(function () {
          that.showLoading = false;
        });
      };
    }
  });