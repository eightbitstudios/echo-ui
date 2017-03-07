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
    controller: function(routesConfig) {
      this.$onInit = function() {
        this.noDriver = _.isUndefined(_.get(this.mapPoint.driver, 'id'));
        this.loadDetails = routesConfig.INDEX.loadDetails.name;
      };
    }
  });
