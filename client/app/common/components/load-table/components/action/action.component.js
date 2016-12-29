angular.module('echo.components.loadTable.action', [
  'echo.components.loadTable.action.actionButton',
  'echo.enums.actions'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
    bindings: {
      load: '<',
      actionChangedCallback: '&',
      carrierId: '<',
      repDetails: '<',
      isMultiStop: '<'
    },
    controller: function (actionEnums) {
      var that = this;

      that.$onInit = function () {
        that.currentStatus = _.find(actionEnums.LAST_ACTION, { value: _.get(that.load.nextAction, 'lastAction') });
        that.nextAction = _.find(actionEnums.AVAILABLE_ACTIONS, { value: _.get(that.load.nextAction, 'nextAction') });
        that.isAddDocuments = (that.nextAction === actionEnums.AVAILABLE_ACTIONS.ADD_DOCUMENTS);
        that.isBooked = (that.currentStatus === actionEnums.LAST_ACTION.BOOKED);
      };
    }
  });
