module.exports = function(grunt) {

  var userConfig = require('./build.config.js')(grunt);
  grunt.initConfig(userConfig);
  grunt.loadTasks('tasks');

  grunt.registerTask('serve', function(env) {
    grunt.task.run([
      'build:' + (env || 'mocks'),
      'env:local',
      'express:dev',
      'watch'
      ]);
    } else if (target === 'qa') {
      grunt.log.write("LOADING CONFIGS FOR QA");
      grunt.config.merge(apiConfigQA);

      grunt.task.run([
        'build',
        'env:local',
        'express:dev',
        'watch'
      ]);
    } else if (target === 'stage') {
      grunt.log.write("LOADING CONFIGS FOR STAGING");
      grunt.config.merge(apiConfigStage);

  grunt.registerTask('dev', function() {
    grunt.task.run(['prepareDeploy:dev']);
  });

  grunt.registerTask('stage', function() {
    grunt.task.run(['prepareDeploy:stage']);
  });

  grunt.registerTask('qa', function() {
    grunt.task.run(['prepareDeploy:qa']);
  });

  grunt.registerTask('test', function() {
    grunt.task.run(['prepareDeploy:test']);
  });

  grunt.registerTask('bat2', function() {
    grunt.task.run(['prepareDeploy:bat2']);
  });

  grunt.registerTask('prepareDeploy', function(env) {
    grunt.task.run([
      'dist:' + env,
      'copy:deploy',
      'install',
      'grunticon',
      'env:dev',
      'express:dist'
    ]);
  });

  // Creates a runnable non minified application in the root build directory
  grunt.registerTask('build', function(env) {
    grunt.task.run([
      'clean:build',
      'jshint',
      'less',
      'grunticon',
      'copy:htmlPartials',
      'html2js',
      'appConfig:' + env,
      'copy:build',
      'gitinfo',
      'copy:version',
      'copy:endpoints',
      'injector',
      'karma:unit'
    ]);
  });

  // Does a build then minifies and copies all front end code over to the root dist directory
  // To get a fully running app in this directory, you'll need to copy the server and package.json
  // over then do an npm install. (This can all be done by calling 'grunt dist copy:deploy')
  grunt.registerTask('dist', function(env) {
    grunt.task.run([
      'clean',
      'build:' + env,
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

  // Creates a runnable non minified application in the root build directory
  grunt.registerTask('appConfig', function(env) {
    grunt.task.run([
      'copy:configFiles',
      'ngconstant:' + env,
      'copy:appConfig' // just copying back to config for ide command + click jumps.
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