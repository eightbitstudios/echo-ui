angular.module('echo.components.modal.milestones.sendLoadUpdate', [
    'echo.components.modal.milestones.milestoneSidebar',
    'echo.api.loads',
    'echo.components.modal.milestones.driverLocation',
    'echo.components.modal.milestones.sendLoadUpdate.droppedLoad',
    'echo.components.modal.milestones.pickupAtYard',
    'echo.components.modal.milestones.card',
    'echo.constants.loadUpdateOptions',
    'echo.models.location',
    'echo.models.dateTimePicker',
    'echo.models.driver',
    'echo.config.globals',
    'echo.services.modal',
    'echo.constants.arrivalTypes',
    'echo.components.modal.errorMessages'
  ])
  .component('sendLoadUpdateModal', {
    templateUrl: 'send-load-update-modal.component.html',
    bindings: {
      modalActions: '<',
      load: '<',
      timeZones: '<',
      sendLoadUpdate: '<',
      carrierId: '<'
    },
    controller: function($q, moment, loadsApi, arrivalTypeConstants, loadUpdateOptionConstants, LocationModel, DateTimePickerModel, modalService, DriverModel) {

      this.translateCardLabel = function(optionIndex) {
        return _.find(loadUpdateOptionConstants, {
          value: optionIndex
        }).description;
      };

      this.showOption = function(option) {
        var that = this;

        switch (option) {
          case loadUpdateOptionConstants.LOCATION.value:
            that.currentStep = that.modes.location;
            break;
          case loadUpdateOptionConstants.TRAILER_DROP.value:
            that.currentStep = that.modes.trailerDropOff;
            break;
          case loadUpdateOptionConstants.TRAILER_PICKUP.value:
            that.currentStep = that.modes.trailerPickup;
            break;
          case loadUpdateOptionConstants.ARRIVAL_AT_DELIVERY.value:
            var address;
            if (_.isArray(that.load.delivery)) {
              address = _.find(that.load.delivery, { isCurrent: true }) || _.last(that.load.delivery);
            } else {
              address = that.load.delivery;
            }
            var modalInstance = modalService.open({
              component: 'report-arrival-modal',
              bindings: {
                load: that.load,
                reportArrival: {
                  actionPerformedOn: that.load.nextAction.actionPerformedOnDate,
                  address: address,
                  driver: that.load.driver
                },
                timeZones: that.timeZones,
                arrivalType: arrivalTypeConstants.DELIVERY
              }
            }).result;

            that.modalActions.close(modalInstance);
            break;
          default:
            that.currentStep = that.modes.overview;
        }
      };

      this.confirmLocation = function() {
        var that = this;

        that.showButtonLoading = true;
        that.errorMessages = null;
        that.errorCode = null;
        loadsApi.createReportLocation(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          location: that.location,
          locationTime: that.dateTimePicker.getDateTime()
        }).then(function() {
          that.modalActions.close(true);
        }).catch(function(status) {
          that.errorMessages = status.message;
          that.errorCode = status.code;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };

      this.confirmDropOff = function() {
        var that = this;

        that.showButtonLoading = true;
        that.errorMessages = null;
        that.errorCode = null;
        loadsApi.createReportTrailer(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          eventTime: that.dateTimePicker.getDateTime(),
          driverLocation: that.location,
          stopType: _.get(_.nth(that.load.delivery, 0), 'stopType')
        }).then(function() {
          that.modalActions.close(true);
        }).catch(function(status) {
          that.errorMessages = status.message;
          that.errorCode = status.code;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };

      this.confirmPickup = function() {
        var that = this;

        that.showButtonLoading = true;
        that.errorMessages = null;
        that.errorCode = null;
        that.assignDriver(that.load.loadNumber, _.get(that.assignedDriver, 'id')).then(function() {
          return loadsApi.createReportTrailer(that.load.loadGuid, {
            timeZone: that.dateTimePicker.timeZone,
            eventTime: that.dateTimePicker.getDateTime(),
            stopType: _.get(_.nth(that.load.pickUp, 0), 'stopType')
          });
        }).then(function() {
          that.modalActions.close(true);
        }).catch(function(status) {
          that.errorMessages = status.message;
          that.errorCode = status.code;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };

      this.confirmDropOffDisabled = function() {
        return !this.location.isValid();
      };

      this.assignDriver = function(loadNumber, driverId) {
        var deferred = $q.defer();
        if (driverId) {
          return loadsApi.assignDriver(loadNumber, driverId);
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      };

      this.$onInit = function() {

        this.modes = {
          overview: 1,
          location: 2,
          trailerPickup: 3,
          trailerDropOff: 4,
          arrivalAtDelivery: 5
        };
        this.currentStep = this.modes.overview;
        this.location = new LocationModel();
        this.dateTimePicker = new DateTimePickerModel({
          minDate: moment(this.sendLoadUpdate.actionPerformedOn, 'MM/DD/YYYY HH:mm:ss')
        });
        if (this.load.driver) {
          this.assignedDriver = new DriverModel(_.get(this.load, 'driver'));
        }
      };
    }
  });
