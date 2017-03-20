angular.module('echo.components.modal.milestones.reportDelivery', [
    'echo.components.modal.milestones.milestoneSidebar',
    'echo.components.modal.milestones.progressIndicator',
    'echo.components.modal.milestones.modalSteps',
    'echo.api.loads',
    'echo.components.modal.milestones.driverLocation',
    'echo.components.modal.milestones.reportEmpty.confirmEmpty',
    'echo.components.modal.milestones.deliveryItems',
    'echo.components.modal.milestones.reportDelivery.comment',
    'echo.components.modal.milestones.rating',
    'echo.models.dateTimePicker',
    'echo.components.modal.errorMessages'
  ])
  .component('reportDeliveryModal', {
    templateUrl: 'report-delivery-modal.component.html',
    bindings: {
      modalActions: '<',
      load: '<',
      items: '<',
      timeZones: '<'
    },
    controller: function(loadsApi, DateTimePickerModel) {

      this.saveReportEmpty = function() {
        var that = this;

        that.showButtonLoading = true;
        that.errorMessages = null;
        that.errorCode = null;
        loadsApi.createReportDelivered(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          eventTime: that.dateTimePicker.getDateTime()
        }).then(function() {
          return loadsApi.createFeedback(that.load.loadGuid,
            that.starRatings,
            that.comment
          );
        }).then(function() {
          that.modalActions.close(true);
        }).catch(function(status) {
          that.errorMessages = status.message;
          that.errorCode = status.code;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };

      this.$onInit = function() {

        this.modes = {
          deliveryItems: 1,
          optionalDocuments: 2
        };
        this.steps = [this.modes.deliveryItems, this.modes.optionalDocuments];
        this.currentStep = this.modes.deliveryItems;
        this.showButtonLoading = false;
        this.buttonsDisabled = false;
        this.comment = null;

        this.starRatings = null;

        this.dateTimePicker = new DateTimePickerModel({
          minDate: moment(this.load.nextAction.actionPerformedOnDate, 'MM/DD/YYYY HH:mm:ss')
        });
      };
    }
  });