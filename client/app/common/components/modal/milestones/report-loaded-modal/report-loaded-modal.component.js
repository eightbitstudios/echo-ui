angular.module('echo.components.modal.milestones.reportLoaded', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.progressIndicator',
  'echo.components.modal.milestones.modalSteps',
  'echo.api.loads',
  'echo.components.modal.milestones.driverLocation',
  'echo.components.modal.milestones.reportEmpty.confirmEmpty',
  'echo.components.modal.milestones.reportLoaded.confirmItems',
  'echo.components.modal.milestones.reportLoaded.finishLoading',
  'echo.components.modal.milestones.reportLoaded.optionalDocuments',
  'echo.models.location',
  'echo.models.dateTimePicker'
])
  .component('reportLoadedModal', {
    templateUrl: 'app/common/components/modal/milestones/report-loaded-modal/report-loaded-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      reportLoaded: '<'
    },
    controller: function (loadsApi, LocationModel, DateTimePickerModel) {
      var that = this;

      that.modes = {
        confirmItems: 1,
        finishLoading: 2,
        optionalDocuments: 3
      };

      that.isNextStepEnabled = function () {
        return true;
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
        that.steps = [that.modes.confirmItems, that.modes.finishLoading, that.modes.optionalDocuments];
        that.currentStep = that.modes.confirmItems;
        that.showButtonLoading = false;

        that.location = new LocationModel();

        that.dateTimePicker = new DateTimePickerModel();

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