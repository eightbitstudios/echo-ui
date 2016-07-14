angular.module('echo.config.api', [])
  .constant('apiConfig', {
    carriers: ('/api/v1/carriers?RepId=22'), //TODO: Remove once login is created
    carrierById: _.template('/api/v1/carriers/${carrierId}'),
    userById: _.template('/api/v1/user/${userId}'),
    repByCarrierId:  _.template('/api/v1/carriers/${carrierId}/echorep'),
    portalUsers: _.template('/api/v1/carriers/${carrierId}/portal-users'),
    driverCount: _.template('/api/v1/carriers/${carrierId}/drivers/count'),
    portalUserById: _.template('/api/v1/carriers/${carrierId}/portal-users/${userId}')
  });
