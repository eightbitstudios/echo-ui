angular.module('echo.config.api', [])
  .constant('apiConfig', {
    carriers: '/api/v1/carriers',
    carrierById: _.template('/api/v1/carriers/${carrierId}'),
    userById: _.template('/api/v1/users/${userId}'),
    deactivateUserById: _.template('/api/v1/users/${userId}/deactivate'),
    user: '/api/v1/users',
    repByCarrierId:  _.template('/api/v1/carriers/${carrierId}/echorep'),
    portalUsers: _.template('/api/v1/carriers/${carrierId}/portalusers'),
    driverCount: _.template('/api/v1/carriers/${carrierId}/drivers/count'),
    portalUserById: _.template('/api/v1/carriers/${carrierId}/portalusers/${userId}')
  });
