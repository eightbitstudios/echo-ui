angular.module('echo.components.loadTable', [
  'echo.components.shippingDetails',
  'echo.components.loadTable.driver',
  'echo.components.loadTable.action',
  'echo.components.loadTable.load',
  'echo.constants.actions'
]).component('loadTable', {
    templateUrl: 'load-table.component.html',
    bindings: {
      loads: '<',
      loadType: '<',
      showLoading: '<',
      carrierId: '<',
      refreshTableCallback: '&',
      repDetails: '<'
    },
    controller: function (actionConstants) {
      this.determineInactive = function(nextAction, isPickup) {
        if (!nextAction) {
          return false;
        }
        var action = _.find(actionConstants.AVAILABLE_ACTIONS, function (action) { return action.value === nextAction; });
        if (isPickup) {
          return action.phase === 2 || action.phase === 3;
        } else {
          return action.phase === 1 || action.phase === 3;
        }
      };

      this.isCancelledLoad = function(load) {
        return load.nextAction && load.nextAction.lastAction && load.nextAction.lastAction === actionConstants.LAST_ACTION.CANCELLED.value;
      };

      this.isMultiStopLoad = function(load) {
        return _.size(load.pickUp) > 1 || _.size(load.delivery) > 1;
      };
    }
  });
