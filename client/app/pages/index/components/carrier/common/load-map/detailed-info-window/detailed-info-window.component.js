angular.module('echo.components.loadMap.detailedInfoWindow', [
  'echo.components.loadMap.detailedInfoWindow.location',
  'echo.components.loadMap.driverCapturedLocation',
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber',
  'echo.components.loadTable.action.actionButton',
  'echo.models.paging'
])
  .component('detailedInfoWindow', {
    templateUrl: 'detailed-info-window.component.html',
    bindings: {
      mapPoint: '<',
      viewMapHandler: '&',
      expanded: '<',
      actionChangedCallback: '&'
    },
    controller: function (store$, routesConfig, PagingModel) {
      var that = this;

      that.previousLoad = function () {
        if (that.paging.selectedPage > 1) {
          that.paging.previousPage();
          that.selectedLoad = that.mapPoint.loads[that.paging.selectedPage - 1];
        }
      };

      that.nextLoad = function () {
        if (that.paging.selectedPage < that.paging.getNumberOfPages()) {
          that.paging.nextPage();
          that.selectedLoad = that.mapPoint.loads[that.paging.selectedPage - 1];
        }
      };

      that.$onInit = function () {
        that.paging = new PagingModel(1);
        that.paging.setRecords(_.size(that.mapPoint.loads), 1);
        that.selectedLoad = _.first(that.mapPoint.loads);
        that.carrierId = store$.getState().carrier.carrierId;
        that.noDriver = _.isUndefined(_.get(that.selectedLoad.driver, 'id'));
        that.loadDetails = routesConfig.INDEX.loadDetails.name;
      };
    }
  });
