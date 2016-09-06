angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.components.modal.milestones.reportEmpty',
  'echo.components.modal.milestones.reportArrival',
  'echo.services.modal',
  'echo.api.loads',
  'echo.enums.actions',
  'echo.enums.arrivalTypes'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
    bindings: {
      load: '<',
      actionChangedCallback: '&'
    },
    controller: function (appConstants, actionEnums, arrivalTypeEnums, modalService, loadsApi) {
      var that = this;

      that.appConstants = appConstants;
      that.showButtonLoading = false;
      that.currentStatus = _.find(actionEnums, {value: that.load.action.lastAction});
      that.nextAction = _.find(actionEnums, {value: that.load.action.nextAction});

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

      actionHandler[actionEnums.REPORTED_ARRIVAL_AT_PICKUP.value] = function (loadGuid) {
        return loadsApi.fetchReportArrivalByLoadGuid(loadGuid).then(function (reportArrival) {
          return modalService.open({
            component: 'report-arrival-modal',
            bindings: {
              load: that.load,
              reportArrival: reportArrival,
              arrivalType: arrivalTypeEnums.PICKUP.description
            }
          });
        });
      };

      that.openMilestone = function (action) {
        that.showButtonLoading = true;
        actionHandler[action](that.load.loadGuid)
          .then(function (modalInstance) {

            modalInstance.result.then(function (actionChanged) {
              if (actionChanged) {
                that.actionChangedCallback();
              }
            });

          }).finally(function () {
            that.showButtonLoading = false;
          });
      };
    }
  });
