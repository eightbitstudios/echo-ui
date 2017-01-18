angular.module('echo.components.modal.milestones.deliveryItems', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.progressIndicator',
  'echo.components.modal.milestones.modalSteps',
  'echo.api.loads',
  'echo.components.modal.milestones.driverLocation',
  'echo.components.modal.milestones.reportEmpty.confirmEmpty',
  'echo.models.location',
  'echo.models.dateTimePicker',
  'echo.components.modal.disclaimer'
])
  .component('deliveryItems', {
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/components/delivery-items/delivery-items.template.html',
    bindings: {
      items: '<',
      dateTimePicker: '=',
      timeZones: '<'
    }
  });
