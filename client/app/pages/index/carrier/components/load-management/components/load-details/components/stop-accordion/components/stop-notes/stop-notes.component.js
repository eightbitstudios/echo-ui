'use strict';

angular.module('echo.components.stopNotes', [
  'echo.components.readMore'
]).component('stopNotes', {
  bindings: {
    notes: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/stop-notes/stop-notes.component.html'
});