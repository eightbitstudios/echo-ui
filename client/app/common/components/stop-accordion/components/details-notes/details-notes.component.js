'use strict';

angular.module('echo.components.detailsNotes', [
  'echo.components.readMore'
]).component('detailsNotes', {
  bindings: {
    notes: '<'
  },
  templateUrl: 'app/common/components/stop-accordion/components/details-notes/details-notes.template.html',
  controller: function () {
  }
});