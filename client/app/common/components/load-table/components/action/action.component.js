angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.components.modal.milestones.reportEmpty',
  'echo.components.modal.milestones.reportLoaded',
  'echo.components.modal.milestones.reportArrival',
  'echo.components.modal.milestones.sendLoadUpdate',
  'echo.components.modal.milestones.reportDelivery',
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
      actionChangedCallback: '&',
      carrierId: '<'
    },
    controller: function ($q, appConstants, actionEnums, arrivalTypeEnums, modalService, loadsApi, timeZoneApi) {
      var that = this;

      that.appConstants = appConstants;
      that.showButtonLoading = false;
      that.currentStatus = _.find(actionEnums.LAST_ACTION, { value: _.get(that.load.nextAction, 'lastAction') });
      that.nextAction = _.find(actionEnums.AVAILABLE_ACTIONS, { value: _.get(that.load.nextAction, 'nextAction') });

      var actionHandler = {};

      actionHandler[actionEnums.AVAILABLE_ACTIONS.REPORT_EMPTY.value] = function (loadGuid) {
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

      actionHandler[actionEnums.AVAILABLE_ACTIONS.REPORT_LOADED.value] = function (loadGuid) {
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

      actionHandler[actionEnums.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchLoadUpdateOptionsByLoadGuid(loadGuid),
          timeZoneApi.fetchTimeZones(),
          loadsApi.fetchItemsByLoadGuid(loadGuid)])
          .then(_.spread(function (sendLoadUpdate, timeZones, items) {
            return modalService.open({
              component: 'send-load-update-modal',
              bindings: {
                load: that.load,
                sendLoadUpdate: sendLoadUpdate,
                timeZones: timeZones,
                carrierId: that.carrierId,
                items: items
              }
            });
          }));
      };

      actionHandler[actionEnums.AVAILABLE_ACTIONS.REPORT_DELIVERY.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchReportDeliveredByLoadGuid(loadGuid),
          timeZoneApi.fetchTimeZones(),
          loadsApi.fetchItemsByLoadGuid(loadGuid)])
          .then(_.spread(function (reportDelivery, timeZones, items) {
            return modalService.open({
              component: 'report-delivery-modal',
              bindings: {
                load: that.load,
                reportDelivery: reportDelivery,
                timeZones: timeZones,
                items: items
              }
            });
          }));
      };

      actionHandler[actionEnums.AVAILABLE_ACTIONS.REPORT_ARRIVED_AT_PICKUP.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchReportArrivalByLoadGuid(loadGuid),
          timeZoneApi.fetchTimeZones()]).then(_.spread(function (reportArrival, timeZones) {
            return modalService.open({
              component: 'report-arrival-modal',
              reportArrival: reportArrival,
              timeZones: timeZones,
              arrivalType: arrivalTypeEnums.PICKUP.description
            });
          }));
      };

      that.openMilestone = function (action) {
        that.showButtonLoading = true;
        actionHandler[action](that.load.loadGuid)
          .then(function (modalInstance) {

            modalInstance.result.then(function (actionChanged) {
              if (_.isObject(actionChanged)) {
                return actionChanged;
              } else if (actionChanged) {
                return $q.when(actionChanged);
              }
            }).then(function (actionChanged) {
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
