angular.module('echo.index.carrier.loadManagement.loadDetails.activityLog', [
    'echo.filters.firstCharacter'
  ])
  .component('activityLog', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/activity-log/activity-log.template.html',
    bindings: {
      activityLog: '<',
      totalStops: '<'
    },
    controller: function() {
      var that = this;

      that.showDisclaimer = function() {
        return that.totalStops > 2 && _.size(that.activityLog) === 0;
      };

      that.$onInit = function() {
        that.isOpen = false;
      };
    }
  });
