angular.module('echo.index.carrier.loadManagement.loadDetails.activityLog', [
    'echo.filters.firstCharacter',
    'echo.api.loads',
    'echo.components.loading'
  ])
  .component('activityLog', {
    templateUrl: 'activity-log.component.html',
    bindings: {
      load: '<'
    },
    controller: function(loadsApi) {
      var that = this;

      that.showDisclaimer = function() {
        return that.totalStops > 2 && _.isEmpty(that.activityLog);
      };

      that.$onInit = function() {
        that.isOpen = false;
        that.showLoading = true;
        that.showError = false;

        that.totalStops = _.size(that.load.pickUp) + _.size(that.load.delivery);

        loadsApi.fetchActivityLogByLoadId(that.load.loadNumber).then(function(activityLog){
          that.activityLog = activityLog;
        }).catch(function() {
          that.showError = true;
        }).finally(function() {
          that.showLoading = false;
        });
      };
    }
  });
