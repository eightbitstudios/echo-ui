angular.module('echo.components.loadMap.detailedInfoWindow', [
  'echo.components.loadMap.detailedInfoWindow.location',
  'echo.components.loadMap.driverCapturedLocation',
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber',
  'echo.components.loadTable.action.actionButton'
])
  .component('detailedInfoWindow', {
    templateUrl: 'app/common/components/load-map/components/detailed-info-window/detailed-info-window.template.html',
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
