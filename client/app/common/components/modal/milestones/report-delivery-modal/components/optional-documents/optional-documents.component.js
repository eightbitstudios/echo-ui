angular.module('echo.components.modal.milestones.reportDelivery.optionalDocuments', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.progressIndicator',
  'echo.components.modal.milestones.modalSteps',
  'echo.api.loads',
  'echo.components.modal.milestones.driverLocation',
  'echo.components.modal.milestones.reportEmpty.confirmEmpty',
  'echo.models.location',
  'echo.components.modal.milestones.rating',
  'echo.models.dateTimePicker'
])
  .component('reportDeliveryOptionalDocuments', {
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/components/optional-documents/optional-documents.template.html',
    bindings: {
      rating: '='
    },
    controller: function () {
    }
  });