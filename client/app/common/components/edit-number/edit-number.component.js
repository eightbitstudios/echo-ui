'use strict';

angular.module('echo.components.editNumber', [
  'echo.directives.focus'
])
  .component('editNumber', {
    bindings: {
      number: '<',
      defaultText: '@',
      shadowText: '@',
      updateCallback: '&'
    },
    templateUrl: 'app/common/components/edit-number/edit-number.template.html',
    controller: function () {
      var that = this;

      that.showForm = false;
      that.updateNumber = null;
      that.allowSubmit = true;

      that.editNumberHandler = function () {
        that.showForm = true;
      };

      that.cancelButtonHandler = function () {
        that.updateNumber = null;
        that.showForm = false;
      };

      that.saveButtonHandler = function () {
        if (that.allowSubmit) {
          that.allowSubmit = false;
          that.updateCallback({updatedNumber: that.updateNumber}).then(function () {
            that.showForm = false;
            that.updateNumber = null;
            that.allowSubmit = true;
          });
        }
      };
    }
  });
