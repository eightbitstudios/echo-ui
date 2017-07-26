angular.module('echo.components.loadTable.action', [
  'echo.components.loadTable.action.actionButton',
  'echo.constants.actions',
  'echo.constants.loadTypes',
  'echo.config.routes',
  'echo.filters.formatInvoicePODs',
])
  .component('action', {
    templateUrl: 'action.component.html',
    bindings: {
      load: '<',
      loadType: '<',
      actionChangedCallback: '&',
      carrierId: '<',
      repDetails: '<',
      isMultiStop: '<'
    },
    controller: function (actionConstants, loadTypeConstants, routesConfig) {
      var that = this;

      that.documentsRequired = function () {
        return that.load.needsInvoice || that.load.neededPODs > 0;
      };

      that.disableActionButton = function () {
        return that.loadType === that.loadTypeConstants.UNBILLED && !that.documentsRequired();
      };

      that.$onInit = function () {
        that.currentStatus = _.find(actionConstants.LAST_ACTION, { value: _.get(this.load.nextAction, 'lastAction') });
        that.nextAction = _.find(actionConstants.AVAILABLE_ACTIONS, { value: _.get(this.load.nextAction, 'nextAction') });
        that.isAddDocuments = (this.nextAction === actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS);
        that.isBooked = (this.currentStatus === actionConstants.LAST_ACTION.BOOKED);
        that.loadTypeConstants = loadTypeConstants;
        that.routesConfig = routesConfig;
      };
    }
  });