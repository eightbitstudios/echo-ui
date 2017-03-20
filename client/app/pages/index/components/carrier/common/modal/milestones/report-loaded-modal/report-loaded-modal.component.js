angular.module('echo.components.modal.milestones.reportLoaded', [
    'echo.components.modal.milestones.milestoneSidebar',
    'echo.components.modal.milestones.progressIndicator',
    'echo.components.modal.milestones.modalSteps',
    'echo.api.loads',
    'echo.components.modal.milestones.reportEmpty.confirmEmpty',
    'echo.components.modal.milestones.reportLoaded.confirmItems',
    'echo.components.modal.milestones.reportLoaded.finishLoading',
    'echo.models.dateTimePicker',
    'echo.models.checkbox',
    'echo.components.modal.errorMessages'
  ])
  .component('reportLoadedModal', {
    templateUrl: 'report-loaded-modal.component.html',
    bindings: {
      modalActions: '<',
      load: '<',
      items: '<',
      reportLoaded: '<',
      timeZones: '<'
    },
    controller: function(loadsApi, DateTimePickerModel, CheckboxModel) {

      this.isNextStepEnabled = function() {
        return _.every(this.checkboxItems, function(checkboxItem) {
          return checkboxItem.isChecked;
        });
      };

      this.saveReportEmpty = function() {
        var that = this;

        if (!that.weightConfirmed) {
          that.showValidationError = true;
        } else {
          that.showValidationError = false;
          that.showButtonLoading = true;
          that.errorMessages = null;
          that.errorCode = null;
          loadsApi.createReportLoaded(that.load.loadGuid, {
            timeZone: that.dateTimePicker.timeZone,
            departureDate: that.dateTimePicker.getDateTime(),
            loadGuid: that.load.loadGuid
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
          confirmItems: 1,
          finishLoading: 2
        };

        this.steps = [this.modes.confirmItems, this.modes.finishLoading];
        this.currentStep = this.modes.confirmItems;
        this.showButtonLoading = false;
        this.checkboxItems = _.map(this.items, function() {
          return new CheckboxModel();
        });
        this.dateTimePicker = new DateTimePickerModel({
          minDate: moment(this.reportLoaded.actionPerformedOn, 'MM/DD/YYYY HH:mm:ss')
        });

        this.pickupNumbers = _.map(this.load.pickUp, 'pickupNumber');

        this.totalWeight = _.ceil(_.sumBy(this.items, 'estimatedWeight'));
        this.weightConfirmed = false;
      };
    }
  });