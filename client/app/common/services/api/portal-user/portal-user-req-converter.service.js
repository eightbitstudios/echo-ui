'use strict';

angular.module('echo.services.portalUserReqConverter', [])
  .factory('portalUserReqConverterService', function () {

    return {
      convertPortalUser: function (portalUser) {
        var formattedPhone;
        if (!!portalUser && !!portalUser.phone) {
          // Hard check to add country code, US-only at the moment
          formattedPhone = '1' + portalUser.phone;
        }

        return {
          id: portalUser.id,
          email: portalUser.email,
          firstName: portalUser.firstName,
          lastName: portalUser.lastName,
          phoneNumber: formattedPhone,
          carrierId: portalUser.carrierId
        };
      }
    };
  });
