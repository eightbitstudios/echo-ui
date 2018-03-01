module.exports = function(grunt) {

  grunt.config('filerev', {
    options: {
      algorithm: 'md5',
      length: 8
    },
    assets: {
      files: [{
        src: [
          'dist/public/{app,css}/**/*.{js,css}',
          '!dist/public/app/env-vars.js'
        ]
      }]
    }
  });

  grunt.loadNpmTasks('grunt-filerev');
};