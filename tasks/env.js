module.exports = function(grunt) {

  var proxyTypes = require('../server/config/proxy-types');

  var envConfigs = {
    dev_mocks: {
      NODE_ENV: 'dev',
      PROXY_TYPE: proxyTypes.mocks,
      IS_MINIFIED: false
    },

    dev_mixed: {
      NODE_ENV: 'dev',
      PROXY_TYPE: proxyTypes.mixed,
      IS_MINIFIED: false
    },
    
    dev_mixed_min: {
      NODE_ENV: 'dev',
      PROXY_TYPE: proxyTypes.mixed,
      IS_MINIFIED: true
    }
  };

  grunt.config('env', envConfigs);

  grunt.loadNpmTasks('grunt-env');
};
