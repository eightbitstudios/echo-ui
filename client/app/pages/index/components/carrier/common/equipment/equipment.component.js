'use strict';

angular.module('echo.components.equipment', [
  'echo.api.loads'
]).component('equipment', {
  bindings: {
    equipment: '<',
    tractorNumber: '<',
    trailerNumber: '<',
    loadGuid: '<'
  },
  templateUrl: 'equipment.component.html',
  controller: function(loadsApi) {

    this.updateTrailerNumber = function(newTrailerNumber) {
      var that = this;
      return loadsApi.updateTrailerNumber(that.loadGuid, {
        trailerNumber: newTrailerNumber
      }).then(function(data) {
        that.trailerNumber = _.get(data, 'trailerNumber');
      });
    };

    this.$onInit = function() {
      this.normalEquipment = _.filter(this.equipment, {
        isSpecialService: false
      });
      this.specialEquipment = _.filter(this.equipment, {
        isSpecialService: true
      });
    };
  }
});