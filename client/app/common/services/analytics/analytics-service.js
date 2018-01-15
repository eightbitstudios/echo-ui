'user strict';

angular.module('echo.services.analytics', [])
.factory('analyticsService', function () {

    return {
      /**
       * Update user data
       * @param userData
       */
      updateUserUdo: function(userIdentifier) {
        /*jshint camelcase: false */
        if (typeof utag !== 'undefined' && userIdentifier) {
          utag.view({
            customer_email: userIdentifier
          });
        }
      }
    };
});
