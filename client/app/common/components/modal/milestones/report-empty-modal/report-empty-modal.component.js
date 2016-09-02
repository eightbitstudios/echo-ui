angular.module('echo.components.modal.milestones.reportEmpty', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.progressIndicator',
  'echo.components.modal.milestones.modalSteps',
  'echo.components.dateTimePicker',
  'echo.api.loads',
  'echo.models.location',
  'echo.models.dateTimePicker',
  'echo.components.modal.milestones.reportEmpty.confirmEmpty',
  'echo.components.modal.milestones.locationSearch'
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

      that.steps = [that.modes.confirm, that.modes.location];
      that.currentStep = that.modes.confirm;
      that.showButtonLoading = false;

      that.checkboxItems = {
        isEquipmentChecked: {
          isChecked = false
        },
        isServicesChecked: {
          isChecked = false
        },
        isInstrunctionChecked: {
          isChecked = false
        }
      };


      that.location = new LocationModel({
        city: that.reportEmpty.driverLocation.cityName,
        state: that.reportEmpty.driverLocation.stateName
      });

      that.dateTimePicker = new DateTimePickerModel({
        minDate: moment(that.reportEmpty.lastActionDate)
      });

      that.isNextStepEnabled = function () {
        return that.checkboxItems.isEquipmentChecked.isChecked && that.checkboxItems.isServicesChecked.isChecked && that.checkboxItems.isInstrunctionChecked.isChecked;
      };

      that.saveReportEmpty = function () {
        that.showButtonLoading = true;

        loadsApi.createReportEmpty(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          cityName: that.location.city,
          stateName: that.location.state,
          date: that.dateTimePicker.getDateTime()
        }).then(function () {
          that.modalActions.close();
        }).finally(function () {
          that.showButtonLoading = false;
        });

      };
    }
  });