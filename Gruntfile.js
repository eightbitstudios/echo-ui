module.exports = function(grunt) {

  var userConfig = require('./build.config.js')(grunt);
  grunt.initConfig(userConfig);
  grunt.loadTasks('tasks');

  grunt.registerTask('serve', function(env) {
    grunt.config.set('apiConfig', env || 'mocks');
    grunt.task.run([
      'env:local',
      'build',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('prepareDeploy', function() {
    grunt.task.run([
      'env:dev',
      'dist',
      'copy:deploy',
      'install',
      'express:dist'
    ]);
  });

  // Creates a runnable non minified application in the root build directory
  grunt.registerTask('build', function() {
    grunt.task.run([
      'clean:build',
      'jshint',
      'less',
      'grunticon',
      'copy:htmlPartials',
      'html2js',
      'copy:build',
      'copy:envVars',
      'copy:version',
      'injector',
      'karma:unit'
    ]);
  });



  // Does a build then minifies and copies all front end code over to the root dist directory
  // To get a fully running app in this directory, you'll need to copy the server and package.json
  // over then do an npm install. (This can all be done by calling 'grunt dist copy:deploy')
  grunt.registerTask('dist', function() {
    grunt.task.run([
      'clean',
      'build',
      'useminPrepare',
      'ngAnnotate',
      'concat:generated',
      'uglify:generated',
      'cssmin::generated',
      'copy:dist',
      'filerev',
      'usemin'
    ]);
  });

  grunt.registerTask('install', 'install server dependencies', function() {
    var exec = require('child_process').exec;
    var async = this.async();
    exec('npm install --production', {
      cwd: './dist'
    }, function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      async();
    });
  });

};