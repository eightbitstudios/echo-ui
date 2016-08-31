angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.enums.loadTypes',
  'echo.components.modal.milestones.reportEmpty',
  'echo.services.modal'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
    bindings: {
      load: '<'
    },
    controller: function (appConstants, loadTypesEnum, modalService) {
      var that = this;

      that.appConstants = appConstants;
      that.loadTypesEnum = loadTypesEnum;
      that.openMilestone = function () {
        modalService.open({
          component: 'report-empty-modal',
          bindings: {
            load: this.load
          }
        });
      };
    }
  });
