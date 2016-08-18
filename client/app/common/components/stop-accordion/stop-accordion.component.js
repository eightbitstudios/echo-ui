'use strict';

angular.module('echo.components.stopAccordion', [
  'echo.components.itemList'
]).component('stopAccordion', {
  bindings: {},
  templateUrl: 'app/common/components/stop-accordion/stop-accordion.template.html',
  controller: function() { 
    var that = this;
    that.isOpen = true;
  }
});