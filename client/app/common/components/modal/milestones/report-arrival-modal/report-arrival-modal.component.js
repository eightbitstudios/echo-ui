angular.module('echo.components.modal.milestones.reportArrival', [
  'echo.components.modal.milestones.reportArrivalModal.components.arrivalSidebar',
  'echo.components.dateTimePicker',
  'echo.api.loads',
  'echo.models.dateTimePicker'
])
  .component('reportArrivalModal', {
    templateUrl: 'app/common/components/modal/milestones/report-arrival-modal/report-arrival-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      reportArrival: '<',
      arrivalType: '<'
    },
    controller: function (loadsApi, DateTimePickerModel) {
      var that = this;
      that.showButtonLoading = false;

      that.dateTimePicker = new DateTimePickerModel({
        minDate: moment(that.reportArrival.lastActionDate)
      });

      that.confirmArrivalHandler = function () {
        that.showButtonLoading = true;

        loadsApi.updateReportArrivalByLoadGuid(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          date: that.dateTimePicker.getDateTime(),
          arrivalType: that.arrivalType
        }).then(function() {
          that.modalActions.close();
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };
    }
  });
