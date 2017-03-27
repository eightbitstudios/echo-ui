angular.module('echo.components.loadMap.detailedInfoWindow', [
  'echo.components.loadMap.detailedInfoWindow.location',
  'echo.components.loadMap.driverCapturedLocation',
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber',
  'echo.components.loadTable.action.actionButton'
])
  .component('detailedInfoWindow', {
    templateUrl: 'detailed-info-window.component.html',
    bindings: {
      mapPoint: '<',
      viewMapHandler: '&',
      expanded: '<',
      actionChangedCallback: '&'
    },
    controller: function(store$, routesConfig) {
      var that = this;

      that.$onInit = function() {
        that.carrierId = store$.getState().carrier.carrierId;
        that.noDriver = _.isUndefined(_.get(that.mapPoint.driver, 'id'));
        that.loadDetails = routesConfig.INDEX.loadDetails.name;
      };
    }
  });
