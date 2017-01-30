'use strict';

angular.module('echo.components.echoRepContact', [
  'echo.filters.phoneNumber',
  'echo.filters.fullName'
]).component('echoRepContact', {
  bindings: {
    repDetails: '='
  },
  templateUrl: 'app/common/components/echo-rep-contact/echo-rep-contact.template.html',
  controller: function(store$) {
    this.$onInit = function() {
      var that = this;
      store$.subscribe(function(state) {
        that.repDetails = state.rep;
      });
    };
  }
});