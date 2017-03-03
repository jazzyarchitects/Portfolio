"use strict";

module.exports = function(grunt){

  // To time the grunt process
  require('time-grunt')(grunt);

  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({

    clean: {
      all: ['./public/dest/*', './public/dest/*/'],
      scripts: ['./public/dest/**/*.js'],
      styles: ['./public/dest/**/*.css']
    },
    
    eslint: {
      options: {
        configFile: './.eslintrc.js',
        silent: true
      },
      src: ['./public/js/**/*.js', '!./node_modules/**/*.js']
    },

    concat: {
      scripts: {
        src: ['./public/js/*.js'],
        dest: './public/dest/concat/concat.js'
      },
      styles: {
        src: ['./public/css/*.css'],
        dest: './public/dest/concat/concat.css'
      }
    },

    
    uglify: {
      development:{
        files: {
        './public/dest/js/script.min.js': ['./public/dest/concat/concat.js']
        }
      }
    },
    

    cssmin: {
      options:{
        restructuring: false
      },
      development: {
        files: {
          './public/dest/css/styles.min.css': ['./public/dest/concat/concat.css']
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

  grunt.task.registerTask('js-files', "Cleans, Lints and minimises JavaScript files", ['eslint','clean:scripts', 'concat:scripts', 'uglify']);
  grunt.task.registerTask('css-files', "Cleans and minimises CSS files", ['clean:styles', 'concat:styles', 'cssmin']);
}