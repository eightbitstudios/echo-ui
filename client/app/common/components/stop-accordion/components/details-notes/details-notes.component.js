'use strict';

angular.module('echo.components.detailsNotes', [
  'echo.components.readMore'
]).component('detailsNotes', {
  bindings: {},
  templateUrl: 'app/common/components/stop-accordion/components/details-notes/details-notes.template.html',
  controller: function () {
    var that = this;
    that.isOpen = true;
    that.text = 'DROP trailer 24/7.STRICT DELIVERY DATE. ***TRAILER WILL NOT GET UNLOADED UNTIL THE END OF THE DELIVERY WINDOW DATE*** Can drop @ anytime. DROP trailer 24/7.STRICT DELIVERY DATE. ***TRAILER WILL NOT GET UNLOADED UNTIL THE END OF THE DELIVERY WINDOW DATE*** Can drop @ anytime. DROP trailer 24/7.STRICT DELIVERY DATE. ***TRAILER WILL NOT GET UNLOADED UNTIL THE END OF THE DELIVERY WINDOW DATE*** Can drop @ anytime';

  }
});