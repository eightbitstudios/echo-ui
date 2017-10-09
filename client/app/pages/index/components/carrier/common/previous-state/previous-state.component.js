angular.module('echo.index.carrier.previousState', [
  'echo.config.routes'
]).component('previousState', {
  templateUrl: 'previous-state.component.html',
  bindings: {
    linkType: '@?'
  },
  controller: function($stateParams, routesConfig, $window) {
    var that = this;

    that.$onInit = function() {
      this.$window = $window;

      var previousRoute = _.find(routesConfig.INDEX, function(route) {
        return route.name === $stateParams.previous;
      });

      if (previousRoute) {
        that.previousRouteName = previousRoute.title;
        that.previousRoute = previousRoute.name;
      }
    };
  }
});
