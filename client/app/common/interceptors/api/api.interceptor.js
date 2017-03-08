angular.module('echo.interceptors.api', [
    'echo.config.api',
    'echo.config.envVars'
  ])
  .factory('apiInterceptor', function(envVarsConfig, apiConfig) {

    return {
      request: function(config) {
        if(config.url.match(/\./g) === null){
          config.url = _.join([envVarsConfig.url, envVarsConfig.path, apiConfig.version, config.url], '');
        }
        return config;
      }
    };
  });