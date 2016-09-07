angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.components.modal.milestones.reportEmpty',
  'echo.components.modal.milestones.reportLoaded',
  'echo.components.modal.milestones.reportDelivery',
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

      actionHandler[actionEnums.REPORT_DELIVERY.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchReportEmptyByLoadGuid(loadGuid), 
        loadsApi.fetchItemsByLoadGuid(loadGuid),
        timeZoneApi.fetchTimeZones()]).then(_.spread(function (reportEmpty, items, timeZones) {
          return modalService.open({
            component: 'report-delivery-modal',
            bindings: {
              load: that.load,
              reportEmpty: reportEmpty,
              items: items,
              timeZones: timeZones
            }
          });
        }));
      };

      actionHandler[actionEnums.REPORT_LOADED.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchReportLoadedByLoadGuid(loadGuid),
        loadsApi.fetchItemsByLoadGuid(loadGuid), 
        timeZoneApi.fetchTimeZones()]).then(_.spread(function (reportLoaded, items, timeZones) {
          return modalService.open({
            component: 'report-loaded-modal',
            bindings: {
              load: that.load,
              reportLoaded: reportLoaded,
              items: items,
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
