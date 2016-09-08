angular.module('echo.components.modal.milestones.sendLoadUpdate', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.api.loads',
  'echo.components.modal.milestones.driverLocation',
  'echo.components.modal.milestones.card',
  'echo.enums.loadUpdateOptions'
])
  .component('sendLoadUpdateModal', {
    templateUrl: 'app/common/components/modal/milestones/send-load-update-modal/send-load-update-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      sendLoadUpdate: '<'
    },
    controller: function (loadsApi, loadUpdateOptionEnums) {
      var that = this;

      that.translateCardLabel = function (optionIndex) {
        return _.find(loadUpdateOptionEnums, {value: optionIndex}).description;
      };
    }
  });
