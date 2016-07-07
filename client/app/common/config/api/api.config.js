angular.module('echo.config.api', [])
  .constant('apiConfig', {
    carrierById: _.template('/api/v1/carriers/${carrierId}'),
    userById: _.template('/api/v1/user/${userId}'),
    repByCarrierId:  _.template('/api/v1/carriers/${carrierId}/rep')
  });
