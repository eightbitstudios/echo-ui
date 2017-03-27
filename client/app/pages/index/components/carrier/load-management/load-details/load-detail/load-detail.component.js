angular.module('echo.index.carrier.loadManagement.loadDetails.loadDetail', [
    'echo.index.carrier.loadManagement.loadDetails.loadDetail.proNumber',
    'echo.constants.loadTypes',
    'echo.constants.actions'
  ])
  .component('loadDetail', {
    templateUrl: 'load-detail.component.html',
    bindings: {
      loadDetail: '=',
      carrierId: '<',
      repDetails: '<',
      refreshLoad: '&'
    },
    controller: function(loadTypeConstants, actionConstants) {
      var that = this;

      that.reloadState = function() {
        that.refreshLoad();
      };

      that.determineInactive = function(nextAction, isPickup) {
        if (!nextAction) {
          return false;
        }
        var action = _.find(actionConstants.AVAILABLE_ACTIONS, function(action) {
          return action.value === nextAction;
        });
        if (isPickup) {
          return action.phase === 2 || action.phase === 3;
        } else {
          return action.phase === 1 || action.phase === 3;
        }
      };

      that.$onInit = function() {
        that.loadType = loadTypeConstants.ACTIVE;
        that.isMultiStop = _.size(that.loadDetail.pickUp) > 1 || _.size(that.loadDetail.delivery) > 1;
      };
    }
  });