angular.module('echo.components.loadTable.driver', [
    'echo.filters.phoneNumber',
    'echo.filters.firstCharacter',
    'echo.filters.onOff',
    'echo.filters.driverStatus',
    'echo.services.modal',
    'echo.components.loading',
    'echo.components.modal.assignDriver',
    'echo.components.modal.verifyDriver',
    'echo.constants.actions',
    'echo.constants.loadTypes'
  ])
  .component('driver', {
    templateUrl: 'driver.component.html',
    bindings: {
      load: '<',
      loadType: '<',
      carrierId: '<',
      driverChangedCallback: '&',
      isMultiStop: '<',
      isCancelledLoad: '<'
    },
    controller: function($q, loadTypeConstants, modalService, loadsApi, driverApi, actionConstants) {
      var that = this;

      that.showVerifyDriverModal = function() {

        that.showComponentLoading = true;
        $q.all([driverApi.verifyDriverByPhone(that.carrierId, that.load.driver.phone),
          loadsApi.fetchEquipmentByLoadId(that.load.loadNumber)
        ]).then(_.spread(function(verifiedDriver, equipment) {
          var modalInstance = modalService.open({
            component: 'verify-driver-modal',
            bindings: {
              load: that.load,
              carrierId: that.carrierId,
              verifiedDriver: verifiedDriver,
              equipment: equipment
            }
          }).result;

          modalInstance.then(function(driverChanged) {
            if (driverChanged) {
              that.driverChangedCallback();
            }
          });

          that.showComponentLoading = false;
        }));
      };

      that.showAssignDriverModal = function() {

        that.showButtonLoading = true;
        loadsApi.fetchEquipmentByLoadId(that.load.loadNumber).then(function(equipment) {
          var modalInstance = modalService.open({
            component: 'assign-driver-modal',
            bindings: {
              load: that.load,
              carrierId: that.carrierId,
              equipment: equipment
            }
          }).result;

          modalInstance.then(function(driverChanged) {
            if (driverChanged) {
              that.driverChangedCallback();
            }
          });
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };

      that.$onInit = function() {
        that.showComponentLoading = false;
        that.noDriver = _.isUndefined(_.get(that.load.driver, 'id'));
        that.loadTypeConstants = loadTypeConstants;
        that.isDisabled = (that.loadType === loadTypeConstants.UNBILLED || that.isMultiStop || (that.load.nextAction && that.load.nextAction.nextAction === actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value));
      };
    }
  });