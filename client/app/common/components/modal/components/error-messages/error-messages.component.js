  angular.module('echo.components.modal.errorMessages', [
    'echo.config.appConstants'
  ])
  .component('errorMessages', {
    templateUrl: 'app/common/components/modal/components/error-messages/error-messages.template.html',
    bindings: {
      errorCode: '=',
      errorMessages: '<',
      stepSensitive: '<',
      validStep: '<',
      currentStep: '<'
    },
    controller: function (appConstants) {
      var that = this;

      that.showErrorMessages = function () {
        if ((_.includes(appConstants.CUSTOM_ERROR_CODES, that.errorCode) && that.errorMessages) ||
          appConstants.ERROR_MESSAGES.DEFAULTS[that.errorCode]) {
          if (that.stepSensitive) {
            var showMessage = that.validStep === that.currentStep;
            if(!showMessage){
              that.errorCode = null;
            }
            return showMessage;
          } else {
            return true;
          }
        } else {
          return false;
        }
      };

      that.determineErrorMessages = function () {
        if (appConstants.ERROR_MESSAGES.DEFAULTS[that.errorCode]) {
          return [appConstants.ERROR_MESSAGES.DEFAULTS[that.errorCode]];
        } else if (_.includes(appConstants.CUSTOM_ERROR_CODES, that.errorCode) && that.errorMessages) {
          return that.errorMessages;
        } else { // Should not happen
          return ['An error occurred. Please contact us.'];
        }
      };
    }
  });
