'use strict';

angular.module('echo.services.portalUserReqConverter', [])
  .factory('portalUserReqConverterService', function () {

    return {
      convertPortalUser: function (portalUser) {
        return {
          id: portalUser.id,
          email: portalUser.email,
          firstName: portalUser.firstName,
          lastName: portalUser.lastName,
          role: portalUser.role,
          phoneNumber: portalUser.phone,
          carrierId: portalUser.carrierId
        };
      }
    };
  });