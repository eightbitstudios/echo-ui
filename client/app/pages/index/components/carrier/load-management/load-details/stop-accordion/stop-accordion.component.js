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
    stopType: '<',
    pickupNumbers: '<'
  },
  templateUrl: 'stop-accordion.component.html',
  controller: function() {
    this.$onInit = function() {
      this.isOpen = true;
      this.formattedCity = _.startCase(_.lowerCase(this.stop.city));
      this.stopTypeLabel = this.stopType === 'Pick' ? 'Pickup' : 'Delivery';
      if(this.pickupNumbers && this.pickupNumbers.length > 0){
        this.pickNumber = this.stopType === 'Pick' ? this.pickupNumbers[0] : this.pickupNumbers.length > 1 ? this.pickupNumbers[1] : '';
      }      
    };
  }
});