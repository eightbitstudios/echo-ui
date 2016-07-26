angular.module('echo.config.api', [])
  .constant('apiConfig', {
    carriers: '@carriers@',
    carrierById: _.template('@carrierById@'),
    userById: _.template('@userById@'),
    deactivateUserById: _.template('@deactivateUserById@'),
    user: '@user@',
    createPassword: _.template('@createPassword@'),
    repByCarrierId:  _.template('@repByCarrierId@'),
    portalUsers: _.template('@portalUsers@'),
    driverCount: _.template('@driverCount@'),
    portalUserById: _.template('@portalUserById@'),
    drivers: _.template('@drivers@'),
    searchDrivers: _.template('@searchDrivers@'),
  });
