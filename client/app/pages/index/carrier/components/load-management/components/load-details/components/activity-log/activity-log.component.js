angular.module('echo.index.carrier.loadManagement.loadDetails.activityLog', [
  'echo.filters.firstCharacter'
])
  .component('activityLog', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/activity-log/activity-log.template.html',
    bindings: {
      activityLog: '<'
    },
    controller: function () {
      var that = this;
      that.isOpen = false;
    }
  });
