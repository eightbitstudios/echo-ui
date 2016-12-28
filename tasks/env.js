module.exports = function(grunt) {

  grunt.config('env', {
    local: {
      NODE_ENV: 'local'
    },
    demo: {
      NODE_ENV: 'demo'
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
    heroku: {
      NODE_ENV: 'heroku'
    },
    production: {
      NODE_ENV: 'production'
    }
  });

  grunt.loadNpmTasks('grunt-env');
};