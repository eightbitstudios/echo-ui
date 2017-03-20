module.exports = function(grunt) {

  grunt.config('html2js', {
    app: {
      options: {
        base: '<%= temp_dir %>/partials',
        rename: function(moduleName) {
          return moduleName.replace(/app\/.+\//, '');
        }
      },
      src: ['<%= temp_dir %>/partials/**/*.html'],
      dest: '<%= build_dir %>/public/app/templates-app.js'
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
};