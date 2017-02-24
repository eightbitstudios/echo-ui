'use strict';

angular.module('echo.components.stopContact', [
  'echo.filters.phoneNumber'
]).component('stopContact', {
  bindings: {
    stop: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/stop-contact/stop-contact.template.html'
});