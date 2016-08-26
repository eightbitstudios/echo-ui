'use strict';

angular.module('echo.components.stopAccordion', [
  'echo.components.itemList',
  'echo.components.detailsLocation',
  'echo.components.detailsContact',
  'echo.components.detailsNotes',
  'echo.components.loadItemDetails'
]).component('stopAccordion', {
  bindings: {
    stop: '<',
    stopType: '@'
  },
  templateUrl: 'app/common/components/stop-accordion/stop-accordion.template.html',
  controller: function() { 
    var that = this;
    that.isOpen = true;
  }
});