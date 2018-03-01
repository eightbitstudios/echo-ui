'use strict';

angular.module('echo.components.editNumber', [
    'echo.directives.focus'
  ])
  .component('editNumber', {
    bindings: {
      number: '<',
      defaultText: '@',
      shadowText: '@',
      updateCallback: '&',
      maxLength: '@'
    },
    templateUrl: 'edit-number.component.html',
    controller: function() {
      this.editNumberHandler = function() {
        this.showForm = true;
      };

      this.cancelButtonHandler = function() {
        this.updateNumber = null;
        this.showForm = false;
      };

      this.saveButtonHandler = function() {
        var that = this;
        if (that.allowSubmit) {
          that.allowSubmit = false;
          that.updateCallback({
            updatedNumber: that.updateNumber
          }).then(function(error) {
            if (!error) {
              that.showForm = false;
              that.updateNumber = null;
            }
            that.allowSubmit = true;
          });
        }
      };

      this.$onInit = function() {
        this.maxLength = this.maxLength || 250;
        this.showForm = false;
        this.updateNumber = null;
        this.allowSubmit = true;
      };
    }
  });