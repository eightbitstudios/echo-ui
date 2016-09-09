angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.components.modal.milestones.reportEmpty',
  'echo.components.modal.milestones.reportArrival',
  'echo.services.modal',
  'echo.api.loads',
  'echo.enums.actions',
  'echo.enums.arrivalTypes',
  'echo.api.timeZone',
  'echo.filters.firstCharacter'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
    bindings: {
      load: '<',
      actionChangedCallback: '&'
    },
    controller: function ($q, appConstants, actionEnums, arrivalTypeEnums, modalService, loadsApi, timeZoneApi) {
      var that = this;

      that.appConstants = appConstants;
      that.showButtonLoading = false;
      that.currentStatus = _.find(actionEnums, {value: _.get(that.load.action, 'lastAction')});
      that.nextAction = _.find(actionEnums, {value: _.get(that.load.action, 'nextAction')});

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

      actionHandler[actionEnums.REPORTED_ARRIVAL_AT_PICKUP.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchReportArrivalByLoadGuid(loadGuid),
          timeZoneApi.fetchTimeZones()]).then(_.spread(function (reportArrival, timeZones) {
          return modalService.open({
            component: 'report-arrival-modal',
            bindings: {
              load: that.load,
              reportArrival: reportArrival,
              timeZones: timeZones,
              arrivalType: arrivalTypeEnums.PICKUP.description
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
