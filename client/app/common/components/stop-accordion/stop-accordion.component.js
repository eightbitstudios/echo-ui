'use strict';

angular.module('echo.components.stopAccordion', [
  'echo.components.itemList',
  'echo.components.detailsLocation',
  'echo.components.detailsContact',
  'echo.components.detailsNotes',
  'echo.components.loadItemDetails'
]).component('stopAccordion', {
  bindings: {},
  templateUrl: 'app/common/components/stop-accordion/stop-accordion.template.html',
  controller: function() { 
    var that = this;
    that.isOpen = true;
    that.text = 'DROP trailer 24/7.STRICT DELIVERY DATE. ***TRAILER WILL NOT GET UNLOADED UNTIL THE END OF THE DELIVERY WINDOW DATE*** Can drop @ anytime. DROP trailer 24/7.STRICT DELIVERY DATE. ***TRAILER WILL NOT GET UNLOADED UNTIL THE END OF THE DELIVERY WINDOW DATE*** Can drop @ anytime. DROP trailer 24/7.STRICT DELIVERY DATE. ***TRAILER WILL NOT GET UNLOADED UNTIL THE END OF THE DELIVERY WINDOW DATE*** Can drop @ anytime';
    
  }
});