'use strict';

angular.module('echo.components.carrierAdminFooter', [
  'echo.components.echoRepContact'
]).component('carrierAdminFooter', {
  templateUrl: 'app/common/components/carrier-admin-footer/carrier-admin-footer.template.html',
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