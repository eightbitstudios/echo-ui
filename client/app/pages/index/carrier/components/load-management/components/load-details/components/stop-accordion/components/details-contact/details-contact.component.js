'use strict';

angular.module('echo.components.detailsContact', [
  'echo.filters.phoneNumber'
]).component('detailsContact', {
  bindings: {
    stop: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/details-contact/details-contact.template.html'
});