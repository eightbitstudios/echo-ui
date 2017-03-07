'use strict';

angular.module('echo.components.stopNotes', [
  'echo.components.readMore'
]).component('stopNotes', {
  bindings: {
    notes: '<'
  },
  templateUrl: 'stop-notes.component.html'
});