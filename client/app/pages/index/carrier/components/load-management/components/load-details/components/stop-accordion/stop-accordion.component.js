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
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/stop-accordion.template.html',
  controller: function () {
    var that = this;
    that.isOpen = true;
    that.formattedCity =  _.startCase(_.lowerCase(that.stop.city));
  }
});