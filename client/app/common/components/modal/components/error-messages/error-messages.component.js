  angular.module('echo.components.modal.errorMessages', [])
  .component('errorMessages', {
    templateUrl: 'app/common/components/modal/components/error-messages/error-messages.template.html',
    bindings: {
      errorMessages: '<',
      stepSensitive: '<',
      validStep: '<',
      currentStep: '<'
    },
    controller: function () {
      var that = this;

      that.showErrorMessages = function () {
        if (that.errorMessages) {
          if (that.stepSensitive) {
            return that.validStep === that.currentStep;
          } else {
            return true;
          }
        } else {
          return false;
        }
      };
    }
  });
