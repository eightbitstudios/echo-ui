angular.module('echo.config.errors', [])
  .constant('errorsConfig', {
    BAD_REQUREST: 400,
    INVALID_EMAIL: 400001,
    REQUIRED_FIELD: 400002,
    CARRIER_NOT_FOUND: 400003,
    USER_NOT_FOUND: 400004,
    UNABLE_TO_UPLOAD: 400148,
    UNAUTHORIZED: 401,
    INVALID_USERNAME_OR_PASSWORD: 401001,
    LOCKED: 401002,
    DEACTIVATED: 401003,
    EXPIRED_TOKEN: 401109
  });