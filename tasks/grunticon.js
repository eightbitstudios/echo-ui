module.exports = function (grunt) {

  grunt.config('grunticon', {
    icons: {
      files: [{
        expand: true,
        cwd: 'client/assets/icons',
        src: ['*.svg', '*.png'],
        dest: '<%= build_dir %>/public/assets/icons'
      }],
      options: {
        enhanceSVG: true  // used to change color/animate particular SVGs
      }
    }
  });

  grunt.loadNpmTasks('grunt-grunticon');
};
