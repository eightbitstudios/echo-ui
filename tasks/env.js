module.exports = function(grunt) {

  grunt.config('env', {
    local: {
      NODE_ENV: 'local'
    },
    dev: {
      NODE_ENV: 'dev'
    }
  });

  grunt.loadNpmTasks('grunt-env');
};