angular.module('echo.index.carrier.loadManagement.loadDetails.activityLog', [
    'echo.filters.firstCharacter'
  ])
  .component('activityLog', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/activity-log/activity-log.component.html',
    bindings: {
      activityLog: '<',
      totalStops: '<'
    },
    controller: function() {
      var that = this;

      that.showDisclaimer = function() {
        return that.totalStops > 2 && that.activityLog.length === 0;
      };

      that.$onInit = function() {
        that.isOpen = false;
      };
    }
  });