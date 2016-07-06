module.exports = function(grunt) {

  var userConfig = require('./build.config.js')(grunt);
  grunt.initConfig(userConfig);
  grunt.loadTasks('tasks');



  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      grunt.task.run([
        'dist',
        'copy:deploy',
        'install',
        'env:heroku',
        'express:dist',
        'keepalive'
      ]);
    } if (target === 'demo') {
      grunt.task.run([
        'dist',
        'copy:deploy',
        'install',
        'env:dev',
        'express:dev',
        'keepalive'
      ]);
    } else {
      grunt.task.run([
        'build',
        'env:dev',
        'express:dev',
        'watch'
      ]);
    }
  });

  grunt.registerTask('demo', function(target) {
    grunt.task.run([
      'dist',
      'copy:deploy',
      'install',
      'env:demo',
      'express:dist'
    ]);
  });

  grunt.registerTask('default', function(target) {
    grunt.task.run(['dist']);
  });

  // Creates a runnable non minified application in the root build directory
  grunt.registerTask('build', function() {
    grunt.task.run([
      'clean:build',
      'jshint',
      'less',
      'copy:htmlPartials',
      'html2js',
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

  grunt.registerTask('test', function() {
    grunt.task.run([
      'build',
      'karma:unit'
    ]);
  });

  grunt.registerTask('prepareDeploy', function() {
    grunt.task.run([
      'dist',
      'copy:deploy',
      'compress'
    ]);
  });

  grunt.registerTask('deploy', function(target) {
    if (!target) {
      console.error(); // TODO: Populate this
      grunt.fail.fatal('Target must be specified for deployment.  Valid targets are heroku-dev and heroku-qa');
      return;
    }
    grunt.task.run([
      'prepareDeploy',
      'buildcontrol:' + target
    ]);
  });


  grunt.registerTask('install', 'install server dependencies', function() {
    var exec = require('child_process').exec;
    var async = this.async();
    exec('npm install --production', {cwd: './dist'}, function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      async();
    });
  });



};
