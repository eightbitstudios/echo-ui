'use strict';

angular.module('echo.components.stopAccordion', [
  'echo.components.itemList',
  'echo.components.stopLocation',
  'echo.components.stopLoadNumbers',
  'echo.components.stopContact',
  'echo.components.stopNotes',
  'echo.components.loadItemDetails'
]).component('stopAccordion', {
  bindings: {
    stop: '<',
    stopType: '@',
    pickupNumbers: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/stop-accordion.component.html',
  controller: function() {
    this.$onInit = function() {
      this.isOpen = true;
      this.formattedCity = _.startCase(_.lowerCase(this.stop.city));
    };
  }
});