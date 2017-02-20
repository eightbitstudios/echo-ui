angular.module('echo.components.loadTable.action', [
  'echo.components.loadTable.action.actionButton',
  'echo.enums.actions',
  'echo.enums.loadTypes',
  'echo.filters.formatInvoicePODs'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
    bindings: {
      load: '<',
      loadType: '<',
      actionChangedCallback: '&',
      carrierId: '<',
      repDetails: '<',
      isMultiStop: '<'
    },
    controller: function (actionEnums, loadTypesEnum) {
      this.$onInit = function () {
        this.currentStatus = _.find(actionEnums.LAST_ACTION, { value: _.get(this.load.nextAction, 'lastAction') });
        this.nextAction = _.find(actionEnums.AVAILABLE_ACTIONS, { value: _.get(this.load.nextAction, 'nextAction') });
        this.isAddDocuments = (this.nextAction === actionEnums.AVAILABLE_ACTIONS.ADD_DOCUMENTS);
        this.isBooked = (this.currentStatus === actionEnums.LAST_ACTION.BOOKED);
        this.loadTypesEnum = loadTypesEnum;
      };
    }
  });
