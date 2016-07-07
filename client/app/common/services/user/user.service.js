'use strict';

angular.module('echo.services.user', [])
  .factory('userService', function ($location, $q) {
    var user = {};

    return {
      getUser: function(){
        return user;
      },
      fetchUser: function () {
        user = {
          id: 1,
          isCarrierRep: $location.search().isCarrierRep
        };
        return $q.when(user);
      }
    };
  });
