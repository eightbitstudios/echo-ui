module.exports = function(grunt) {

  grunt.config('env', {
    local: {
      NODE_ENV: 'local'
    },
    demo: {
      NODE_ENV: 'demo'
    },
    dev: {
      NODE_ENV: 'dev'
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