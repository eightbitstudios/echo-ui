angular.module('echo.components.modal.milestones.reportDelivery.optionalDocuments', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.progressIndicator',
  'echo.components.modal.milestones.modalSteps',
  'echo.api.loads',
  'echo.components.modal.milestones.driverLocation',
  'echo.components.modal.milestones.reportEmpty.confirmEmpty',
  'echo.models.location',
  'echo.components.modal.milestones.rating',
  'echo.components.modal.milestones.reportDelivery.comment',
  'echo.models.dateTimePicker'
])
  .component('reportDeliveryOptionalDocuments', {
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/components/optional-documents/optional-documents.template.html',
    bindings: {
      rating: '=',
      comment: '=',
      buttonsDisabled: '='
    },
    controller: function () {
      var that = this;

      that.modes = {
        documents: 1,
        comment: 2
      };

      that.addComment = function () {
        that.buttonsDisabled = true;
        that.currentStep = that.modes.comment;
      };

      that.exitComment = function() {
        that.buttonsDisabled = false;
        that.currentStep = that.modes.documents;
      };

      that.saveComment = function(comment) {
        that.comment = comment;
        that.exitComment();
      };

      that.$onInit = function() {
        that.currentStep = that.modes.documents;
        that.comment = null;
      };
    }
  });