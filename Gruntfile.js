"use strict";

module.exports = function(grunt){

  // To time the grunt process
  require('time-grunt')(grunt);

  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({

    clean: {
      all: ['./public/dest/*', './public/dest/*/']
    },
    
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
        './public/dest/js/script.min.js': ['./public/js/custom.js']
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
      },
      scripts: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: './public/dest',
        src: ['**/*.js'],
        dest: './public/dest/gzip/'
      },
      styles: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: './public/dest',
        src: ['**/*.css'],
        dest: './public/dest/gzip/'
      }
    },
    

    watch: {
      options: {
        livereload: 3000
      },
      scripts: {
        files: ['./public/js/*.js'],
        tasks: ['uglify', 'compress:scripts']
      },
      styles: {
        files: ['./public/css/**/*.css'],
        tasks: ['cssmin', 'compress:styles']
      }
    }
  });

  grunt.loadNpmTasks("gruntify-eslint");
}