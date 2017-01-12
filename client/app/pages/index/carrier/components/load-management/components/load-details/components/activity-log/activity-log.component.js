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

      this.showDisclaimer = function() {
        return this.totalStops > 2 && this.activityLog.length === 0;
      };

      this.$onInit = function() {
        this.isOpen = false;
      };
    }
  });