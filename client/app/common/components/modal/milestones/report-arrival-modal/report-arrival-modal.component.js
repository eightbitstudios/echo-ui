angular.module('echo.components.modal.milestones.reportArrival', [
  'echo.components.modal.milestones.reportArrivalModal.components.arrivalSidebar',
  'echo.components.dateTimePicker',
  'echo.api.loads',
  'echo.models.dateTimePicker',
  'echo.components.modal.errorMessages'
])
  .component('reportArrivalModal', {
    templateUrl: 'app/common/components/modal/milestones/report-arrival-modal/report-arrival-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      reportArrival: '<',
      arrivalType: '<',
      timeZones: '<'
    },
    controller: function (loadsApi, DateTimePickerModel) {
      var that = this;
      that.showButtonLoading = false;

      that.dateTimePicker = new DateTimePickerModel({
        minDate: moment(that.reportArrival.actionPerformedOn, 'MM/DD/YYYY HH:mm:ss')
      });

      that.confirmArrivalHandler = function () {
        that.showButtonLoading = true;
        that.errorMessages = null;
        that.errorCode = null;

        loadsApi.createReportArrivalByLoadGuid(that.load.loadGuid, {
          timeZone: that.dateTimePicker.timeZone,
          date: that.dateTimePicker.getDateTime(),
          stopType: that.reportArrival.address.stopType
        }).then(function() {
          that.modalActions.close(true);
        }).catch(function (status) {
          that.errorMessages = status.message;
          that.errorCode = status.code;
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };
    }
  });
