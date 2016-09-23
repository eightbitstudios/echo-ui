  angular.module('echo.components.modal.errorMessages', [
    'echo.config.appConstants'
  ])
  .component('errorMessages', {
    templateUrl: 'app/common/components/modal/components/error-messages/error-messages.template.html',
    bindings: {
      errorCode: '<',
      errorMessages: '<',
      stepSensitive: '<',
      validStep: '<',
      currentStep: '<'
    },
    controller: function (appConstants) {
      var that = this;

      that.showErrorMessages = function () {
        if ((_.includes(appConstants.CUSTOM_ERROR_CODES, that.errorCode) && that.errorMessages) ||
          appConstants.ERROR_MESSAGES[that.errorCode]) {
          if (that.stepSensitive) {
            return that.validStep === that.currentStep;
          } else {
            return true;
          }
        } else {
          return false;
        }
      };

      that.determineErrorMessages = function () {
        if (appConstants.ERROR_MESSAGES[that.errorCode]) {
          return [appConstants.ERROR_MESSAGES[that.errorCode]];
        } else if (_.includes(appConstants.CUSTOM_ERROR_CODES, that.errorCode) && that.errorMessages) {
          return that.errorMessages;
        } else { // Should not happen
          return ['An error occurred. Please contact us.'];
        }
      };
    }
  });
