module.exports = function(grunt) {

  grunt.config('env', {
    local: {
      NODE_ENV: 'local'
    },
    stage: {
      NODE_ENV: 'stage'
    },
    dev: {
      NODE_ENV: 'dev'
    },
    test: {
      NODE_ENV: 'test'
    },
    production: {
      NODE_ENV: 'production'
    }
  });

  grunt.loadNpmTasks('grunt-env');
};