angular.module('echo.components.loadTable', [
  'echo.components.shippingDetails',
  'echo.components.loadTable.driver',
  'echo.components.loadTable.action',
  'echo.components.loadTable.load',
  'echo.enums.actions'
]).component('loadTable', {
    templateUrl: 'app/common/components/load-table/load-table.template.html',
    bindings: {
      loads: '<',
      loadType: '<',
      showLoading: '<',
      carrierId: '<',
      refreshTableCallback: '&',
      hideDetails: '<'
    },
    controller: function (actionEnums) {
      var that = this;

      that.determineInactive = function(nextAction, isPickup) {
        if (!nextAction) {
          return false;
        }
        var action = _.find(actionEnums.AVAILABLE_ACTIONS, function (action) { return action.value === nextAction; });
        if (isPickup) {
          return action.phase === 2 || action.phase === 3;
        } else {
          return action.phase === 1 || action.phase === 3;
        }
      };
    }
  });
