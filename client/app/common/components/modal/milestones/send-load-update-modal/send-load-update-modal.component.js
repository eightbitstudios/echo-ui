angular.module('echo.components.modal.milestones.sendLoadUpdate', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.api.loads',
  'echo.components.modal.milestones.driverLocation',
  'echo.components.modal.milestones.sendLoadUpdate.droppedLoad',
  'echo.components.modal.milestones.pickupAtYard',
  'echo.components.modal.milestones.card',
  'echo.enums.loadUpdateOptions',
  'echo.models.location',
  'echo.models.dateTimePicker',
  'echo.services.modal',
  'echo.enums.arrivalTypes'
])
  .component('sendLoadUpdateModal', {
    templateUrl: 'app/common/components/modal/milestones/send-load-update-modal/send-load-update-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      timeZones: '<',
      sendLoadUpdate: '<',
      reportArrival: '<',
      carrierId: '<'
    },
    controller: function (loadsApi, arrivalTypeEnums, loadUpdateOptionEnums, LocationModel, DateTimePickerModel, modalService) {
      var that = this;

      that.modes = {
        overview: 1,
        location: 2,
        trailerPickup: 3,
        trailerDropOff: 4,
        arrivalAtDelivery: 5
      };

      that.translateCardLabel = function (optionIndex) {
        return _.find(loadUpdateOptionEnums, { value: optionIndex }).description;
      };

      that.determineTrailerReportType = function () {
        if (that.currentStep === that.modes.trailerPickup) {
          return loadUpdateOptionEnums.TRAILER_PICKUP.typeFlag;
        } else if (that.currentStep === that.modes.trailerDropOff) {
          return loadUpdateOptionEnums.TRAILER_DROP.typeFlag;
        } else {
          return null;
        }
      };

      that.showOption = function (option) {
        switch (option) {
          case loadUpdateOptionEnums.LOCATION.value:
            that.currentStep = that.modes.location;
            break;
          case loadUpdateOptionEnums.TRAILER_DROP.value:
            that.currentStep = that.modes.trailerDropOff;
            break;
          case loadUpdateOptionEnums.TRAILER_PICKUP.value:
            that.currentStep = that.modes.trailerPickup;
            break;
          case loadUpdateOptionEnums.ARRIVAL_AT_DELIVERY.value:
            var modalInstance = modalService.open({
              component: 'report-arrival-modal',
              bindings: {
                load: that.load,
                reportArrival: that.reportArrival,
                timeZones: that.timeZones,
                arrivalType: arrivalTypeEnums.DELIVERY.description
              }
            }).result;

            that.modalActions.close(modalInstance);
            break;
          default:
            that.currentStep = that.modes.overview;
        }
      };

      that.confirmLocation = function () {
        that.showButtonLoading = true;
        loadsApi.updateReportLocation(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          location: {
            cityName: that.location.city,
            stateCode: that.location.state
          },
          locationTime: that.dateTimePicker.getDateTime()
        }).then(function () {
          that.modalActions.close(true);
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.confirmDropOff = function () {
        that.showButtonLoading = true;
        loadsApi.createReportTrailer(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          eventTime: that.dateTimePicker.getDateTime(),
          driverLocation: {
            cityName: that.location.city,
            stateCode: that.location.state
          },
          reportType: that.determineTrailerReportType()
        }).then(function () {
          that.modalActions.close(true);
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.confirmPickup = function () {
        that.showButtonLoading = true;
        loadsApi.createReportTrailer(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          eventTime: that.dateTimePicker.getDateTime(),
          stopType: that.determineTrailerReportType()
        }).then(function () {
          that.modalActions.close(true);
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.confirmPickupDisabled = function () {
        return !_.get(that.assignedDriver, 'id');
      };

      that.confirmDropOffDisabled = function () {
        return !that.location.isValid();
      };

      that.$onInit = function () {
        that.currentStep = that.modes.overview;
        that.location = new LocationModel();
        that.dateTimePicker = new DateTimePickerModel({
          minDate: moment(that.sendLoadUpdate.lastActionDate)
        });
      };
    }
  });
