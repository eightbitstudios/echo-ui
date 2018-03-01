module.exports = function(grunt) {

  grunt.config('uglify', {
    files: {
      'dist/public/app/reference.js': ['build/public/app/reference/reference.config.js'],
    },
    options: {
      // known usemin limitation on combination of uglify and filerev so source maps are turned off on JS for now
      // https://github.com/yeoman/grunt-filerev/issues/62
      // sourceMap: true,
      // sourceMapIncludeSources: true
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};