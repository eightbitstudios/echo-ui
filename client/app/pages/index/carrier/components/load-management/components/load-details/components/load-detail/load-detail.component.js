angular.module('echo.index.carrier.loadManagement.loadDetails.loadDetail', [
    'echo.index.carrier.loadManagement.loadDetails.loadDetail.proNumber',
    'echo.enums.loadTypes',
    'echo.enums.actions'
  ])
  .component('loadDetail', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/load-detail/load-detail.template.html',
    bindings: {
      loadDetail: '=',
      carrierId: '<',
      repDetails: '<',
      refreshLoad: '&'
    },
    controller: function($state, loadTypesEnum, actionEnums) {
      var that = this;

      that.reloadState = function() {
        that.refreshLoad();
      };

      that.determineInactive = function(nextAction, isPickup) {
        if (!nextAction) {
          return false;
        }
        var action = _.find(actionEnums.AVAILABLE_ACTIONS, function(action) {
          return action.value === nextAction;
        });
        if (isPickup) {
          return action.phase === 2 || action.phase === 3;
        } else {
          return action.phase === 1 || action.phase === 3;
        }
      };

      that.$onInit = function() {
        that.loadType = loadTypesEnum.ACTIVE;
        that.isMultiStop = _.size(that.loadDetail.pickUp) > 1 || _.size(that.loadDetail.delivery) > 1;
      };
    }
  });