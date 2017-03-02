'use strict';

angular.module('echo.components.detailsNotes', [
  'echo.components.readMore'
]).component('detailsNotes', {
  bindings: {
    notes: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/details-notes/details-notes.template.html'
});