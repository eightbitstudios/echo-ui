module.exports = function(grunt) {

  grunt.config('injector', {
      options: {
        relative: true,
        addRootSlash: false,
        lineEnding: require('os').EOL
      },
      app: {
        files: {
          '<%= build_dir %>/public/index.html': [
            '<%= build_dir %>/public/app/common/**/*.js',
            '<%= build_dir %>/public/app/pages/index/**/*.js',
            '<%= build_dir %>/public/app/app.js',
            '<%= build_dir %>/public/app/templates-app.js',
            '!<%= build_dir %>/public/app/**/*.spec.js'
          ],
          '<%= build_dir %>/public/login.html': [
            '<%= build_dir %>/public/app/common/**/*.js',
            '<%= build_dir %>/public/app/pages/login/**/*.js',
            '<%= build_dir %>/public/app/app.js',
            '<%= build_dir %>/public/app/templates-app.js',
            '!<%= build_dir %>/public/app/**/*.spec.js'
          ]
        }
      }
    });

  grunt.loadNpmTasks('grunt-injector');
};