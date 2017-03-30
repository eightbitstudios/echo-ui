module.exports = function(grunt) {

  grunt.config('watch', {
    options: {
      interval: 500,
      spawn: false
    },
    express: {
      files: ['server/**/*.js'],
      tasks: ['express:dev'],
      options: {
        spawn: false
      }
    },
    js: {
      files: ['client/app/**/*.js'],
      tasks: ['jshint:src', 'copy:build', 'copy:envVars', 'injector', 'karma:unit']
    },
    jsunit: {
      files: ['client/app/**/*.spec.js'],
      tasks: ['karma:unit']
    },
    less: {
      files: ['client/app/**/*.less'],
      tasks: ['less:compile']
    },
    assets: {
      files: ['client/assets/**/*'],
      tasks: ['copy:build', 'injector']
    },
    html: {
      files: ['client/app/pages/**/*.html','client/app/pages/**/**/*.html','client/app/common/components/**/*.html'],
      tasks: ['copy:htmlPartials', 'html2js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};
