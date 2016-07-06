module.exports = function(grunt) {

  grunt.config('env', {
    dev: {
      NODE_ENV: 'dev'
    },
    demo: {
      NODE_ENV: 'demo'
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