angular.module('echo.config.api', [])
  .constant('apiConfig', {
    carriers: '@carriers@',
    carrierById: _.template('@carrierById@'),
    userById: _.template('@userById@'),
    deactivateUserById: _.template('@deactivateUserById@'),
    user: '@user@',
    createPassword: _.template('@createPassword@'),
    signIn: '@signIn@',
    signOut: '@signOut@',
    refresh: '@refresh@',
    repByCarrierId:  _.template('@repByCarrierId@'),
    forgotPassword: '@forgotPassword@',
    changePassword: _.template('@changePassword@'),
    portalUsers: _.template('@portalUsers@'),
    driverCount: _.template('@driverCount@'),
    portalUserById: _.template('@portalUserById@')
  });
