'use strict';

angular.module('echo.api.portalUser', [
    'echo.config.api',
    'echo.services.portalUserReqConverter',
    'echo.services.cookie',
    'echo.config.routes',
    'echo.services.userProfile'
  ])
  .factory('portalUserApi', function($http, $q, $window, store$, apiConfig, routesConfig,
    cookieService, portalUserReqConverterService) {

    return {

      /**
       * @description Upserts a portal user
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      upsertPortalUser: function(portalUser) {

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
      updatePortalUserById: function(portalUser) {

        var url = _.template(apiConfig.userById)({ userId: portalUser.id });
        var data = portalUserReqConverterService.convertPortalUser(portalUser);

        return $http.put(url, data).then(function(resp) {
          return resp.data.data;
        }).catch(function(resp) {
          return $q.reject(resp.data.status.code);
        });
      },

      /**
       * @description Deactivates a portal user
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      deactivatePortalUserById: function(portalUser) {

        var url = _.template(apiConfig.deactivateUserById)({ userId: portalUser.id });
        var data = portalUserReqConverterService.convertPortalUser(portalUser);

        return $http.put(url, data).then(function(resp) {
          var state = store$.getState();
          if (state.user.userId === portalUser.id) {
            cookieService.clearToken();
            cookieService.clearRefreshToken();
            $window.location = routesConfig.LOGIN.base.url;
          }

          return resp.data.data;
        }).catch(function(resp) {
          return $q.reject(resp.data.status.code);
        });
      },
      /**
       * @description Creates a new portal user
       * @param {number} portalUser - Portal user
       * @returns {Promise} - Promise containing a UserModel
       */
      insertPortalUser: function(portalUser) {

        var url = apiConfig.user;
        var data = portalUserReqConverterService.convertPortalUser(portalUser);

        return $http.post(url, data).then(function (resp) {
          return resp.data.data;
        }).catch(function(resp) {
          return $q.reject(resp.data.status.code);
        });
      },

      /**
       * @description Creates a new invitation email for a user
       * @param {number} userId - Id for user
       * @returns {Promise} - Promise containing updated invite info
       */
      resendInviteToPortalUserById: function (userId) {
        var url = _.template(apiConfig.resendInviteToUserById)({userId: userId});

        return $http.post(url, {}).then(function (resp) {
          return resp.data.data;
        }).catch(function (resp) {
          return $q.reject(resp.data.status.code);
        });
      }
    };
  });
