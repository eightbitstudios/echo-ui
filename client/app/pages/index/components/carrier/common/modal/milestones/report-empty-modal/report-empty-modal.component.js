angular.module('echo.components.modal.milestones.reportEmpty', [
    'echo.components.modal.milestones.milestoneSidebar',
    'echo.components.modal.milestones.progressIndicator',
    'echo.components.modal.milestones.modalSteps',
    'echo.api.loads',
    'echo.components.modal.milestones.driverLocation',
    'echo.components.modal.milestones.reportEmpty.confirmEmpty',
    'echo.models.location',
    'echo.models.dateTimePicker',
    'echo.models.checkbox',
    'echo.components.modal.errorMessages'
  ])
  .component('reportEmptyModal', {
    templateUrl: 'report-empty-modal.component.html',
    bindings: {
      modalActions: '<',
      load: '<',
      reportEmpty: '<',
      timeZones: '<'
    },
    controller: function(loadsApi, LocationModel, DateTimePickerModel, CheckboxModel) {

      this.isNextStepEnabled = function() {
        return this.checkboxItems.equipmentCheckbox.isChecked &&
          this.checkboxItems.serviceCheckbox.isChecked &&
          this.checkboxItems.instructionCheckbox.isChecked;
      };

      this.saveReportEmpty = function() {
        var that = this;

        if (!that.location.isValid()) {
          that.showValidationError = true;
        } else {
          that.showValidationError = false;
          that.showButtonLoading = true;
          that.errorMessages = null;
          that.errorCode = null;
          loadsApi.createReportEmpty(that.load.loadGuid, {
            timeZone: that.dateTimePicker.timeZone,
            driverLocation: that.location,
            eventTime: that.dateTimePicker.getDateTime()
          }).then(function() {
            that.modalActions.close(true);
          }).catch(function(status) {
            that.errorMessages = status.message;
            that.errorCode = status.code;
          }).finally(function() {
            that.showButtonLoading = false;
          });
        }
      };

      this.$onInit = function() {
        this.modes = {
          confirm: 1,
          location: 2
        };
        this.steps = [this.modes.confirm, this.modes.location];
        this.currentStep = this.modes.confirm;
        this.showButtonLoading = false;
        this.showValidationError = false;

        this.location = new LocationModel({
          cityName: _.get(this.reportEmpty.driverLocation, 'cityName'),
          stateCode: _.get(this.reportEmpty.driverLocation, 'stateCode'),
          stateId: _.get(this.reportEmpty.driverLocation, 'stateId')
        });

        this.dateTimePicker = new DateTimePickerModel({
          minDate: moment(this.reportEmpty.actionPerformedOn, 'MM/DD/YYYY HH:mm:ss')
        });

        this.checkboxItems = {
          equipmentCheckbox: new CheckboxModel(),
          serviceCheckbox: new CheckboxModel(),
          instructionCheckbox: new CheckboxModel()
        };
      };
    }
  });