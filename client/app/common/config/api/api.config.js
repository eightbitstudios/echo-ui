angular.module('echo.config.api', [])
  .constant('apiConfig', {
    carriers: '@carriers@',
    carrierById: _.template('@carrierById@'),
    userById: _.template('@userById@'),
    deactivateUserById: _.template('@deactivateUserById@'),
    user: '@user@',
    repByCarrierId:  _.template('@repByCarrierId@'),
    portalUsers: _.template('@portalUsers@'),
    driverCount: _.template('@driverCount@'),
    portalUserById: _.template('@portalUserById@')
  });
