angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.components.modal.milestones.reportEmpty',
  'echo.services.modal',
  'echo.api.loads',
  'echo.enums.actions'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
    bindings: {
      load: '<',
      actionChangedCallback: '&'
    },
    controller: function (appConstants, actionEnums, modalService, loadsApi) {
      var that = this;

      that.appConstants = appConstants;
      that.showButtonLoading = false;
      that.currentStatus = _.capitalize(_.lowerCase(that.load.action.currentStatus));
      that.nextAction = _.capitalize(_.lowerCase(that.load.action.nextAction));

      var actionHandler = {};

      actionHandler[actionEnums.REPORTED_EMPTY.value] = function (loadGuid) {
        return loadsApi.fetchReportEmptyByLoadGuid(loadGuid).then(function (reportEmpty) {
          return modalService.open({
            component: 'report-empty-modal',
            bindings: {
              load: that.load,
              reportEmpty: reportEmpty
            }
          });
        });
      };

      that.openMilestone = function () {
        that.showButtonLoading = true;
        actionHandler[actionEnums.REPORTED_EMPTY.value](that.load.loadGuid)
          .then(function (modalInstance) {

            modalInstance.result.then(function (changedAction) {
              if (changedAction) {
                that.actionChangedCallback();
              }
            });

          }).finally(function () {
            that.showButtonLoading = false;
          });
      };
    }
  });
