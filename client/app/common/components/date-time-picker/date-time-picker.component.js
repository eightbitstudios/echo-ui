'use strict';

angular.module('echo.components.dateTimePicker', [])
  .component('dateTimePicker', {
    bindings: {
      time: '='
    },
    templateUrl: 'app/common/components/date-time-picker/date-time-picker.template.html',
    controller: function () {
    }
  });