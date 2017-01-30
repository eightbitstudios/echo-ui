'use strict';

angular.module('echo.services.routing', [
  'echo.services.cookie',
  'echo.services.userProfile',
  'echo.config.routes'
])
  .factory('routingService', function ($window, $state, store$, routesConfig, cookieService) {
    return {
      handleRouting: function (event, toState, from) {
        if (_.get(toState.data, 'auth')) { // Check if state requires authentication
          var jwt = cookieService.getToken();
          if (from.name !== toState.name) {
            $state.previous = from;
          }
          if (jwt) {  // Check if user is authenticated
            var user = store$.getState().user;
            if (toState.name === routesConfig.INDEX.base.name) { // Reroute user to their dashboard based on role
              event.preventDefault();

              if (user.isRepAdmin()) {
                $state.go(routesConfig.INDEX.myCarriers.name);
              } else {
                $state.go(routesConfig.INDEX.dashboard.name, { carrierId: user.carrierId });
              }
            } else if (_.get(toState.data, 'role') && toState.data.role !== _.get(user, 'role')) { // Prevent user from going to states they don't 
              // have permissions to.
              event.preventDefault();
            }
          } else {
            event.preventDefault(); // Reroute user to the login page if they are not authenticated
            $window.location = routesConfig.LOGIN.base.redirectUrl({ redirect: encodeURIComponent($window.location.hash) });
          }
        }
      }
    };
  });
