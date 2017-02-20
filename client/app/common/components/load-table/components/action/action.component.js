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
    controller: function (actionEnums, loadTypesEnum, routesConfig) {
      var that = this;

      that.documentsRequired = function () {
        return that.load.needsInvoice || that.load.neededPODs > 0;
      };

      that.disableActionButton = function () {
        return that.loadType === that.loadTypesEnum.UNBILLED && !that.documentsRequired();
      };

      that.$onInit = function () {
        that.currentStatus = _.find(actionEnums.LAST_ACTION, { value: _.get(this.load.nextAction, 'lastAction') });
        that.nextAction = _.find(actionEnums.AVAILABLE_ACTIONS, { value: _.get(this.load.nextAction, 'nextAction') });
        that.isAddDocuments = (this.nextAction === actionEnums.AVAILABLE_ACTIONS.ADD_DOCUMENTS);
        that.isBooked = (this.currentStatus === actionEnums.LAST_ACTION.BOOKED);
        that.loadTypesEnum = loadTypesEnum;
        that.routesConfig = routesConfig;
      };
    }
  });
