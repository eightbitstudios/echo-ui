angular.module('echo.interceptors.api', [
    'echo.config.api',
    'echo.config.reference'
  ])
  .factory('apiInterceptor', function(referenceConfig, apiConfig) {

    return {
      request: function(config) {
        if(config.url.match(/\./g) === null){
          config.url = _.join([referenceConfig.url, referenceConfig.path, apiConfig.version, config.url], '');
        }
        return config;
      }
    };
  });