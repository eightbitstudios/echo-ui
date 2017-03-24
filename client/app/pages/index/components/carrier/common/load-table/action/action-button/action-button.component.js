angular.module('echo.components.loadTable.action.actionButton', [
  'echo.config.appConstants',
  'echo.components.modal.milestones.reportEmpty',
  'echo.components.modal.milestones.reportLoaded',
  'echo.components.modal.milestones.reportArrival',
  'echo.components.modal.milestones.sendLoadUpdate',
  'echo.components.modal.milestones.reportDelivery',
  'echo.components.modal.documentUpload',
  'echo.services.modal',
  'echo.api.loads',
  'echo.api.document',
  'echo.config.globals',
  'echo.constants.actions',
  'echo.constants.arrivalTypes',
  'echo.api.timeZone',
  'echo.filters.lastModifiedBy'
])
  .component('actionButton', {
    templateUrl: 'action-button.component.html',
    bindings: {
      load: '=',
      actionChangedCallback: '&',
      carrierId: '<',
      mapView: '<'
    },
    controller: function ($q, moment, appConstants, actionConstants, arrivalTypeConstants, modalService, loadsApi, documentApi, timeZoneApi) {
      var that = this;

      that.appConstants = appConstants;

      var actionHandler = {};

      actionHandler[actionConstants.AVAILABLE_ACTIONS.REPORT_EMPTY.value] = function (loadGuid) {
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

      actionHandler[actionConstants.AVAILABLE_ACTIONS.REPORT_LOADED.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchItemsByLoadGuid(loadGuid),
          timeZoneApi.fetchTimeZones()]).then(_.spread(function (items, timeZones) {
          return modalService.open({
            component: 'report-loaded-modal',
            bindings: {
              load: that.load,
              reportLoaded: {
                actionPerformedOn: moment(that.load.nextAction.actionPerformedOnDate, 'MM/DD/YYYY HH:mm:ss'),
              },
              items: items,
              timeZones: timeZones
            }
          });
        }));
      };

      actionHandler[actionConstants.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value] = function (loadGuid) {
        return $q.all([loadsApi.fetchLoadUpdateOptionsByLoadGuid(loadGuid),
          timeZoneApi.fetchTimeZones()])
          .then(_.spread(function (sendLoadUpdate, timeZones) {
            return modalService.open({
              component: 'send-load-update-modal',
              bindings: {
                load: that.load,
                sendLoadUpdate: sendLoadUpdate,
                timeZones: timeZones,
                carrierId: that.carrierId
              }
            });
          }));
      };

      actionHandler[actionConstants.AVAILABLE_ACTIONS.REPORT_DELIVERY.value] = function (loadGuid) {
        return $q.all([timeZoneApi.fetchTimeZones(),
          loadsApi.fetchItemsByLoadGuid(loadGuid)])
          .then(_.spread(function (timeZones, items) {
            return modalService.open({
              component: 'report-delivery-modal',
              bindings: {
                load: that.load,
                timeZones: timeZones,
                items: items
              }
            });
          }));
      };

      actionHandler[actionConstants.AVAILABLE_ACTIONS.REPORT_ARRIVAL_AT_PICKUP.value] = function () {
        return timeZoneApi.fetchTimeZones().then(function (timeZones) {
          var address;
          if (_.isArray(that.load.pickUp)) {
            address = _.find(that.load.pickUp, { isCurrent: true }) || _.last(that.load.pickUp);
          } else {
            address = that.load.pickUp;
          }
          return modalService.open({
            component: 'report-arrival-modal',
            bindings: {
              load: that.load,
              carrierId: that.carrierId,
              reportArrival: {
                actionPerformedOn: moment(that.load.nextAction.actionPerformedOnDate, 'MM/DD/YYYY HH:mm:ss'),
                address: address,
                driver: that.load.driver
              },
              timeZones: timeZones,
              arrivalType: arrivalTypeConstants.PICKUP
            }
          });
        });
      };

      actionHandler[actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value] = function () {
        return documentApi.fetchDocuments(that.carrierId, that.load.loadGuid).then(function (documents) {
          return modalService.open({
            component: 'document-upload-modal',
            bindings: {
              load: that.load,
              documents: documents
            }
          });
        });
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

      that.$onInit = function () {
        that.showButtonLoading = false;
        that.currentStatus = _.find(actionConstants.LAST_ACTION, { value: _.get(that.load.nextAction, 'lastAction') });
        that.nextAction = _.find(actionConstants.AVAILABLE_ACTIONS, { value: _.get(that.load.nextAction, 'nextAction') });

        if (that.load.escalationLevel === 2) {
          that.actionButtonEscalationClass = 'btn-warning';
        } else if (that.load.escalationLevel === 3) {
          that.actionButtonEscalationClass = 'btn-danger';
        } else if (that.mapView) {
          that.actionButtonEscalationClass = 'btn-primary';
        }
      };
    }
  });
