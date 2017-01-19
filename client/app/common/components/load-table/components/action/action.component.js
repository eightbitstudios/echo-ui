angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber',
  'echo.config.appConstants',
  'echo.components.modal.milestones.reportEmpty',
  'echo.components.modal.milestones.reportLoaded',
  'echo.components.modal.milestones.reportArrival',
  'echo.components.modal.milestones.sendLoadUpdate',
  'echo.components.modal.milestones.reportDelivery',
  'echo.components.modal.documentUpload',
  'echo.services.modal',
  'echo.api.loads',
  'echo.config.globals',
  'echo.enums.actions',
  'echo.enums.arrivalTypes',
  'echo.api.timeZone',
  'echo.api.document',
  'echo.filters.lastModifiedBy'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
    bindings: {
      load: '<',
      actionChangedCallback: '&',
      carrierId: '<',
      repDetails: '<',
      isMultiStop: '<'
    },
    controller: function($q, moment, appConstants, actionEnums, arrivalTypeEnums, modalService, loadsApi, timeZoneApi) {

      this.openMilestone = function(action) {
        var that = this;

        that.showButtonLoading = true;
        that.actionHandler[action](that.load.loadGuid)
          .then(function(modalInstance) {

            modalInstance.result.then(function(actionChanged) {
              if (_.isObject(actionChanged)) {
                return actionChanged;
              } else if (actionChanged) {
                return $q.when(actionChanged);
              }
            }).then(function(actionChanged) {
              if (actionChanged) {
                that.actionChangedCallback();
              }
            });

          }).finally(function() {
            that.showButtonLoading = false;
          });
      };

      this.$onInit = function() {
        var that = this;

        that.appConstants = appConstants;
        that.showButtonLoading = false;
        that.currentStatus = _.find(actionEnums.LAST_ACTION, {
          value: _.get(that.load.nextAction, 'lastAction')
        });
        that.nextAction = _.find(actionEnums.AVAILABLE_ACTIONS, {
          value: _.get(that.load.nextAction, 'nextAction')
        });
        that.isAddDocuments = (that.nextAction === actionEnums.AVAILABLE_ACTIONS.ADD_DOCUMENTS);
        that.isBooked = (that.currentStatus === actionEnums.LAST_ACTION.BOOKED);

        if (that.load.escalationLevel === 2) {
          that.actionButtonEscalationClass = 'btn-warning';
        } else if (that.load.escalationLevel === 3) {
          that.actionButtonEscalationClass = 'btn-danger';
        }

        that.actionHandler = {};

        that.actionHandler[actionEnums.AVAILABLE_ACTIONS.REPORT_EMPTY.value] = function(loadGuid) {
          return $q.all([loadsApi.fetchReportEmptyByLoadGuid(loadGuid),
            timeZoneApi.fetchTimeZones()
          ]).then(_.spread(function(reportEmpty, timeZones) {
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

        that.actionHandler[actionEnums.AVAILABLE_ACTIONS.REPORT_LOADED.value] = function(loadGuid) {
          return $q.all([loadsApi.fetchItemsByLoadGuid(loadGuid),
            timeZoneApi.fetchTimeZones()
          ]).then(_.spread(function(items, timeZones) {
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

        that.actionHandler[actionEnums.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value] = function(loadGuid) {
          return $q.all([loadsApi.fetchLoadUpdateOptionsByLoadGuid(loadGuid),
              timeZoneApi.fetchTimeZones()
            ])
            .then(_.spread(function(sendLoadUpdate, timeZones) {
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

        that.actionHandler[actionEnums.AVAILABLE_ACTIONS.REPORT_DELIVERY.value] = function(loadGuid) {
          return $q.all([timeZoneApi.fetchTimeZones(),
              loadsApi.fetchItemsByLoadGuid(loadGuid)
            ])
            .then(_.spread(function(timeZones, items) {
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

      actionHandler[actionEnums.AVAILABLE_ACTIONS.REPORT_ARRIVAL_AT_PICKUP.value] = function () {
        return timeZoneApi.fetchTimeZones().then(function (timeZones) {
          return modalService.open({
            component: 'report-arrival-modal',
            bindings: {
              load: that.load,
              carrierId: that.carrierId,
              reportArrival: {
                actionPerformedOn: moment(that.load.nextAction.actionPerformedOnDate, 'MM/DD/YYYY HH:mm:ss'),
                address: _.find(that.load.pickUp, { isCurrent: true }) || _.last(that.load.pickUp),
                driver: that.load.driver
              },
              timeZones: timeZones,
              arrivalType: arrivalTypeEnums.PICKUP
            }
          });
        });
      };

      actionHandler[actionEnums.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value] = function() {
         return documentApi.fetchDocuments(that.load.loadGuid).then(function(documents){
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
    }
  });
