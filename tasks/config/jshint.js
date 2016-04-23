module.exports = function (grunt) {
  grunt.config.set('jshint', {
    jshint: {
      myFiles: ['../../api/controllers/**/*.js']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
