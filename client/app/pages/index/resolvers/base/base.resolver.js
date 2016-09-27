'use strict';

angular.module('echo.index.resolvers.base', [
  'echo.services.cookie',
  'echo.services.userProfile',
  'echo.api.rep'
])
  .factory('baseResolver', function ($q, cookieService, userProfileService, repApi) {
    return {
      user: function () {
        var jwt = cookieService.getToken();

        if (jwt) {
          var userObj = userProfileService.mapJwtToUser(jwt);
          userProfileService.setUser(userObj);
        }

        var user = userProfileService.getUser();
        return $q.when(user);
      },
      repDetails: function (user) {
        return repApi.fetchRepByCarrierId(user.carrierId);
      }
    };
  });