'use strict';

angular.module('echo.services.portalUser', [
  'echo.config.api'
])
  .factory('portalUserService', function ($http, $q, apiConfig) {

    return {

      /**
       * @description Upserts a portal user to a carrier
       * @param {number} carrierId - Id for carrier
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      upsertPortalUser: function (carrierId, portalUser) {

        var serviceCall;
        if(portalUser.Id){
          serviceCall = this.updatePortalUserById(carrierId, portalUser);
        }else {
          serviceCall = this.insertPortalUser(carrierId, portalUser);
        }
        return serviceCall;
      },

      /**
       * @description Updates a portal user in a carrier
       * @param {number} carrierId - Id for carrier
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      updatePortalUserById: function (carrierId, portalUser) {

        var url = apiConfig.portalUserById({ carrierId: carrierId, userId: portalUser.Id });

        return $http.post(url, portalUser).then(function (resp) {
          return resp.data.data;
        }).catch(function(resp){
          return $q.reject(resp.data.status.message);
        });
      },

      /**
       * @description Inserts a portal user in a carrier
       * @param {number} carrierId - Id for carrier
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      insertPortalUser: function (carrierId, portalUser) {

        var url = apiConfig.portalUsers({ carrierId: carrierId });

        return $http.post(url, portalUser).then(function (resp) {
          return resp.data.data;
        }).catch(function(resp){
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

        var url = apiConfig.portalUserById({ carrierId: carrierId, userId: userId });

        return $http.get(url).then(function (resp) {
          return resp.data.data;
        });
      }
    };
  });
