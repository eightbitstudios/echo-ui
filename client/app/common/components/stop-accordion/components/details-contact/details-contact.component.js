'use strict';

angular.module('echo.components.detailsContact', [
  'echo.filters.phoneNumber'
]).component('detailsContact', {
  bindings: {
    stop: '<'
  },
  templateUrl: 'app/common/components/stop-accordion/components/details-contact/details-contact.template.html',
  controller: function() { 
  }
});