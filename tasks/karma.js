module.exports = function(grunt) {

  grunt.config('karma', {
    unit: {
      configFile: 'karma.conf.js',
      autoWatch: false,
      singleRun: true
    },

    debug: {
      configFile: 'karma.conf.js',
      browsers: ['Chrome'],
      autoWatch: true,
      singleRun: false,
    }
  });

  grunt.loadNpmTasks('grunt-karma');
};