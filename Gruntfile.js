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
    },
    uglify: {
      development:{
        files: {
        './public/dest/js/script.min.js': ['./public/js/*.js']
        }
      }
    },
    cssmin: {
      options:{
        restructuring: false
      },
      development: {
        files: {
          './public/dest/css/styles.min.css': ['./public/css/*.css']
        }
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: './public/dest',
        src: ['**/*'],
        dest: './public/dest/gzip/'
      }
    }
  });

  grunt.loadNpmTasks("gruntify-eslint");
}