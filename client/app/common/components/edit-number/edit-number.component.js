'use strict';

angular.module('echo.components.editNumber', [])
  .component('editNumber', {
    bindings: {
      number: '<',
      defaultText: '@',
      updateCallback: '&'
    },
    templateUrl: 'app/common/components/edit-number/edit-number.template.html',
    controller: function () {
      var that = this;

      that.showForm = false;
      that.updateNumber = null;

      that.editNumberHandler = function () {
        that.showForm = true;
      };

      that.cancelButtonHandler = function () {
        that.showForm = false;
      };

      that.saveButtonHandler = function () {
        that.updateCallback({ updatedNumber: that.updateNumber }).then(function () {
          that.showForm = false;
        });
      };
    }
  });
