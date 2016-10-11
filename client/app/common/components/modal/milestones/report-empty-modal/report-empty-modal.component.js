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
    templateUrl: 'app/common/components/modal/milestones/report-empty-modal/report-empty-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      reportEmpty: '<',
      timeZones: '<'
    },
    controller: function (loadsApi, LocationModel, DateTimePickerModel, CheckboxModel) {
      var that = this;

      that.modes = {
        confirm: 1,
        location: 2
      };

      that.isNextStepEnabled = function () {
        return that.checkboxItems.equipmentCheckbox.isChecked && that.checkboxItems.serviceCheckbox.isChecked && that.checkboxItems.instructionCheckbox.isChecked;
      };

      that.saveReportEmpty = function () {
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
          }).then(function () {
            that.modalActions.close(true);
          }).catch(function (status) {
            that.errorMessages = status.message;
            that.errorCode = status.code;
          }).finally(function () {
            that.showButtonLoading = false;
          });
        }
      };

      that.$onInit = function () {
        that.steps = [that.modes.confirm, that.modes.location];
        that.currentStep = that.modes.confirm;
        that.showButtonLoading = false;
        that.showValidationError = false;

        that.location = new LocationModel({
          cityName: _.get(that.reportEmpty.driverLocation, 'cityName'),
          stateCode: _.get(that.reportEmpty.driverLocation, 'stateCode'),
          stateId: _.get(that.reportEmpty.driverLocation, 'stateId')
        });

        that.dateTimePicker = new DateTimePickerModel({
          minDate: moment(that.reportEmpty.lastActionDate)
        });

        that.checkboxItems = {
          equipmentCheckbox: new CheckboxModel(),
          serviceCheckbox: new CheckboxModel(),
          instructionCheckbox: new CheckboxModel()
        };
      };
    }
  });
