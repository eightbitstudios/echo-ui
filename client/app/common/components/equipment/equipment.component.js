
'use strict';

angular.module('echo.components.equipment', []).component('equipment', {
  bindings: {
    equipment: '<',
    tractorNumber: '<',
    trailerNumber: '<'
  },
  templateUrl: 'app/common/components/equipment/equipment.template.html',
  controller: function () {
    var that = this;

    that.normalEquipment = _.filter(that.equipment, { isSpecialService: false });
    that.specialEquipment = _.filter(that.equipment, { isSpecialService: true });
  }
});