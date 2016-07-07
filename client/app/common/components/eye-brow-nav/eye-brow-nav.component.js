'use strict';

angular.module('echo.components.eyeBrowNav', [
  'echo.config.routesConfig',
  'echo.components.billingQuestions'
]).component('eyeBrowNav', {
  bindings: {
    carrierDetails: '=',
    repDetails: '=',
    user: '='
  },
  templateUrl: 'app/common/components/eye-brow-nav/eye-brow-nav.template.html',
  controller: function (routesConfig) {
    this.routesConfig = routesConfig;
  }
});