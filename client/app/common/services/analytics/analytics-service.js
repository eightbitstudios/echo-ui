'user strict';

angular.module('echo.services.analytics', [])
.factory('analyticsService', function () {

    return {
      /**
       * Update user data
       * @param userData
       */
      updateUserUdo: function(userData) {
        /*jshint camelcase: false */
        if (typeof utag !== 'undefined' && userData) {
          utag.view({
            customer_email: userData.unique_name
          });
        }
      }
    };
});