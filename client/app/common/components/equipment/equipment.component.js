
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
  templateUrl: 'app/common/components/equipment/equipment.template.html',
  controller: function (loadsApi) {
    var that = this;

    that.normalEquipment = _.filter(that.equipment, { isSpecialService: false });
    that.specialEquipment = _.filter(that.equipment, { isSpecialService: true });

    that.updateTrailerNumber = function (newTrailerNumber) {
      return loadsApi.updateTrailerNumber(that.loadGuid, { trailerNumber: newTrailerNumber }).then(function (loadDetails) {
        that.trailerNumber = loadDetails.trailerNumber;
      });
    };
  }
});
