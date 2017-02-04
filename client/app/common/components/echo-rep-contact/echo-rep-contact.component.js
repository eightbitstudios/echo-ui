'use strict';

angular.module('echo.components.echoRepContact', [
  'echo.filters.phoneNumber',
  'echo.filters.fullName'
]).component('echoRepContact', {
  bindings: {},
  templateUrl: 'app/common/components/echo-rep-contact/echo-rep-contact.template.html',
  controller: function(store$) {
    var that = this;
    var sub = null;

    that.$onInit = function() {
      sub = store$.subscribe(function(state) {
        that.repDetails = state.rep;
      });
    };

    that.$onDestroy = function() {
      sub.dispose();
    };
  }
});