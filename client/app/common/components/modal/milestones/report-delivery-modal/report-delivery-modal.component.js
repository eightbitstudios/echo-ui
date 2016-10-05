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
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/report-delivery-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      items: '<',
      timeZones: '<'
    },
    controller: function ($q, loadsApi, DateTimePickerModel) {
      var that = this;

      that.modes = {
        deliveryItems: 1,
        optionalDocuments: 2
      };

      that.saveReportEmpty = function () {
        that.showButtonLoading = true;
        that.errorMessages = null;
        that.errorCode = null;
        $q.all([
          loadsApi.createReportDelivered(that.load.loadGuid, {
            timeZone: that.dateTimePicker.timeZone,
            rating: that.rating,
            comment: that.comment,
            eventTime: that.dateTimePicker.getDateTime()
          }),
          loadsApi.createFeedback(that.load.loadGuid, {
            starRatings: that.rating,
            comment: that.comment
          })
        ]).then(_.spread(function () {
          that.modalActions.close(true);
        })).catch(function (status) {
          that.errorMessages = status.message;
          that.errorCode = status.code;
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.$onInit = function () {
        that.steps = [that.modes.deliveryItems, that.modes.optionalDocuments];
        that.currentStep = that.modes.deliveryItems;
        that.showButtonLoading = false;
        that.buttonsDisabled = false;
        that.comment = null;

        that.rating = {};

        that.dateTimePicker = new DateTimePickerModel({
          minDate: moment(that.load.nextAction.lastActionDate)
        });
      };
    }
  });
