angular.module('echo.config.api', [])
  .constant('apiConfig', {
    carriers: ('/api/v1/carriers'),
    carrierById: _.template('/api/v1/carriers/${carrierId}'),
    userById: _.template('/api/v1/user/${userId}'),
    repByCarrierId:  _.template('/api/v1/carriers/${carrierId}/rep'),
    portalUsers: _.template('/api/v1/carriers/${carrierId}/portalUsers'),
    driverCount: _.template('/api/v1/carriers/${carrierId}/drivers/count'),
    portalUserById: _.template('/api/v1/carriers/${carrierId}/portal-users/${userId}')
  });
