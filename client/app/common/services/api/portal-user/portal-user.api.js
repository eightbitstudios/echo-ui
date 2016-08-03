'use strict';

angular.module('echo.api.portalUser', [
  'echo.config.api',
  'echo.services.portalUserReqConverter'
])
  .factory('portalUserApi', function ($http, $q, apiConfig, portalUserReqConverterService) {

    return {

      /**
       * @description Upserts a portal user
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      upsertPortalUser: function (portalUser) {

        var serviceCall;
        if (portalUser.id) {
          serviceCall = this.updatePortalUserById(portalUser);
        } else {
          serviceCall = this.insertPortalUser(portalUser);
        }
        return serviceCall;
      },

      /**
       * @description Updates a portal user
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      updatePortalUserById: function (portalUser) {

        var url = apiConfig.userById({ userId: portalUser.id });
        var data = portalUserReqConverterService.convertPortalUser(portalUser);

        return $http.put(url, data).then(function (resp) {
          return resp.data.data;
        }).catch(function (resp) {
          return $q.reject(resp.data.status.message);
        });
      },

      /**
       * @description Deactivates a portal user
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      deactivatePortalUserById: function (portalUser) {

        var url = apiConfig.deactivateUserById({ userId: portalUser.id });
        var data = portalUserReqConverterService.convertPortalUser(portalUser);

        return $http.put(url, data).then(function (resp) {
          return resp.data.data;
        }).catch(function (resp) {
          return $q.reject(resp.data.status.message);
        });
      },
      /**
       * @description Creates a new portal user
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      insertPortalUser: function (portalUser) {

        var url = apiConfig.user;
        var data = portalUserReqConverterService.convertPortalUser(portalUser);
        
        return $http.post(url, data).then(function (resp) {
          return resp.data.data;
        }).catch(function (resp) {
          return $q.reject(resp.data.status.message);
        });
      },

      /**
       * @description Retrieves a portal user for a carrier
       * @param {number} carrierId - Id for carrier
       * @param {number} userId - Id for user
       * @returns {Promise} - Promise containing driver counts
       */
      fetchPortalUserById: function (carrierId, userId) {

        var url = apiConfig.userById({ carrierId: carrierId, userId: userId });

        return $http.get(url).then(function (resp) {
          return resp.data.data;
        });
      }
    };
  });
