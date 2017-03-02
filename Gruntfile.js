"use strict";

module.exports = function(grunt){

  // To time the grunt process
  require('time-grunt')(grunt);

  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    eslint: {
      options: {
        configFile: './.eslintrc.js',
        silent: true
      },
      src: ['./**/*.js', '!./node_modules/**/*.js', '!./public/**/*.min.js']
    }
  });

  grunt.loadNpmTasks("gruntify-eslint");
}