angular.module('echo.components.modal.milestones.reportLoaded', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.progressIndicator',
  'echo.components.modal.milestones.modalSteps',
  'echo.api.loads',
  'echo.components.modal.milestones.reportEmpty.confirmEmpty',
  'echo.components.modal.milestones.reportLoaded.confirmItems',
  'echo.components.modal.milestones.reportLoaded.finishLoading',
  'echo.components.modal.milestones.reportLoaded.optionalDocuments',
  'echo.models.dateTimePicker',
  'echo.models.checkbox'
])
  .component('reportLoadedModal', {
    templateUrl: 'app/common/components/modal/milestones/report-loaded-modal/report-loaded-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      items: '<',
      reportLoaded: '<',
      timeZones: '<'
    },
    controller: function (loadsApi, DateTimePickerModel, CheckboxModel) {
      var that = this;

      that.modes = {
        confirmItems: 1,
        finishLoading: 2,
        optionalDocuments: 3
      };

      that.totalWeight = _.ceil(_.sumBy(that.items, 'estimatedWeight'));

      that.isNextStepEnabled = function () {
        return _.every(that.checkboxItems, function(checkboxItem){
          return checkboxItem.isChecked;
        });
      };

      that.saveReportEmpty = function () {
        that.showButtonLoading = true;
        loadsApi.createReportLoaded(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          departureDate: that.dateTimePicker.getDateTime(),
          loadGuid: that.load.loadGuid
        }).then(function () {
          that.modalActions.close(true);
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.pickupNumbers = _.map(that.load.pickUp, function (pickup) {
        return pickup.pickupNumber;
      });

      that.$onInit = function () {
        that.steps = [that.modes.confirmItems, that.modes.finishLoading, that.modes.optionalDocuments];
        that.currentStep = that.modes.confirmItems;
        that.showButtonLoading = false;
        that.checkboxItems = _.map(that.items, function () {
          return new CheckboxModel();
        });
        that.dateTimePicker = new DateTimePickerModel({
          minDate: moment(that.reportLoaded.lastActionDate)
        });
      };
    }
  });