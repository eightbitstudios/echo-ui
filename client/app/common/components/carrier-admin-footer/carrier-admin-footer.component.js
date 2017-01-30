'use strict';

angular.module('echo.components.carrierAdminFooter', [
  'echo.components.echoRepContact'
]).component('carrierAdminFooter', {
  templateUrl: 'app/common/components/carrier-admin-footer/carrier-admin-footer.template.html',
  controller: function(store$) {
    this.$onInit = function() {
      var that = this;
      store$.subscribe(function(state) {
        that.repDetails = state.rep;
      });
    };
  }
});