angular.module('echo.components.modal.milestones.reportDelivery', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.progressIndicator',
  'echo.components.modal.milestones.modalSteps',
  'echo.api.loads',
  'echo.components.modal.milestones.driverLocation',
  'echo.components.modal.milestones.reportEmpty.confirmEmpty',
  'echo.components.modal.milestones.deliveryItems',
  'echo.components.modal.milestones.reportDelivery.optionalDocuments',
  'echo.models.location',
  'echo.models.dateTimePicker'
])
  .component('reportDeliveryModal', {
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/report-delivery-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      items: '<',
      reportDelivery: '<',
      timeZones: '<'
    },
    controller: function (loadsApi, LocationModel, DateTimePickerModel) {
      var that = this;

      that.modes = {
        deliveryItems: 1,
        optionalDocuments: 2
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
        that.steps = [that.modes.deliveryItems, that.modes.optionalDocuments];
        that.currentStep = that.modes.deliveryItems;
        that.showButtonLoading = false;

        that.location = new LocationModel();
        that.rating = {};

        that.dateTimePicker = new DateTimePickerModel();
      };
    }
  });