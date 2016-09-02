angular.module('echo.components.modal.milestones.reportEmpty', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.progressIndicator',
  'echo.components.modal.milestones.modalSteps',
  'echo.api.loads',
  'echo.components.modal.milestones.driverLocation',
  'echo.components.modal.milestones.reportEmpty.confirmEmpty',
  'echo.models.location',
  'echo.models.dateTimePicker'
])
  .component('reportEmptyModal', {
    templateUrl: 'app/common/components/modal/milestones/report-empty-modal/report-empty-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      reportEmpty: '<'
    },
    controller: function (loadsApi, LocationModel, DateTimePickerModel) {
      var that = this;

      that.modes = {
        confirm: 1,
        location: 2
      };

      that.isNextStepEnabled = function () {
        return that.checkboxItems.equipmentCheckbox.isChecked && that.checkboxItems.seviceCheckbox.isChecked && that.checkboxItems.instrunctionCheckbox.isChecked;
      };

      that.saveReportEmpty = function () {
        that.showButtonLoading = true;
        loadsApi.createReportEmpty(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          cityName: that.location.city,
          stateName: that.location.state,
          date: that.dateTimePicker.getDateTime()
        }).then(function () {
          that.modalActions.close(true);
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.$onInit = function () {
        that.steps = [that.modes.confirm, that.modes.location];
        that.currentStep = that.modes.confirm;
        that.showButtonLoading = false;

        that.location = new LocationModel({
          city: that.reportEmpty.driverLocation.cityName,
          state: that.reportEmpty.driverLocation.stateName
        });

        that.dateTimePicker = new DateTimePickerModel({
          minDate: moment(that.reportEmpty.lastActionDate)
        });

        that.checkboxItems = {
          equipmentCheckbox: {
            isChecked: false
          },
          seviceCheckbox: {
            isChecked: false
          },
          instrunctionCheckbox: {
            isChecked: false
          }
        };

      };
    }
  });