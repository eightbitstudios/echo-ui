angular.module('echo.config.api', [])
  .constant('apiConfig', {
    carriers: '@carriers@',
    carrierById: _.template('@carrierById@'),
    userById: _.template('@userById@'),
    deactivateUserById: _.template('@deactivateUserById@'),
    user: '@user@',
    createPassword: _.template('@createPassword@'),
    signIn: '@signIn@',
    repByCarrierId:  _.template('@repByCarrierId@'),
    forgotPassword: '@forgotPassword@',
    portalUsers: _.template('@portalUsers@'),
    driverCount: _.template('@driverCount@'),
    portalUserById: _.template('@portalUserById@')
  });
