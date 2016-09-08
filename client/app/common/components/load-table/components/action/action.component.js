angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.components.modal.milestones.reportEmpty',
  'echo.components.modal.milestones.sendLoadUpdate',
  'echo.services.modal',
  'echo.api.loads',
  'echo.enums.actions',
  'echo.api.timeZone',
  'echo.filters.firstCharacter'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
    bindings: {
      load: '<',
      actionChangedCallback: '&'
    },
    controller: function ($q, appConstants, actionEnums, modalService, loadsApi, timeZoneApi) {
      var that = this;

      that.appConstants = appConstants;
      that.showButtonLoading = false;
      that.currentStatus = _.find(actionEnums, { value: that.load.action.lastAction });
      that.nextAction = _.find(actionEnums, { value: that.load.action.nextAction });

      var actionHandler = {};

      actionHandler[actionEnums.REPORTED_EMPTY.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchReportEmptyByLoadGuid(loadGuid),
          timeZoneApi.fetchTimeZones()]).then(_.spread(function (reportEmpty, timeZones) {
            return modalService.open({
              component: 'report-empty-modal',
              bindings: {
                load: that.load,
                reportEmpty: reportEmpty,
                timeZones: timeZones
              }
            });
          }));
      };

      actionHandler[actionEnums.SENT_LOAD_UPDATE.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchLoadUpdateOptionsByLoadGuid(loadGuid), timeZoneApi.fetchTimeZones()])
          .then(_.spread(function (sendLoadUpdate, timeZones) {
            return modalService.open({
              component: 'send-load-update-modal',
              bindings: {
                load: that.load,
                sendLoadUpdate: sendLoadUpdate,
                timeZones: timeZones
              }
            });
          }));
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
