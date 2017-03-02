'use strict';

angular.module('echo.components.carrierAdminFooter', [
  'echo.components.echoRepContact'
]).component('carrierAdminFooter', {
  templateUrl: 'app/common/components/carrier-admin-footer/carrier-admin-footer.component.html',
  controller: function(store$) {

    var that = this;

    that.$onInit = function() {
      that.repDetails = {};
      var sub = store$.subscribe(function(state) {
        if (!_.isEmpty(state.rep)) {
          that.repDetails = state.rep;
          sub.dispose();
        }
      });
    };
  }
});