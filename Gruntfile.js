'use strict';

var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
  // To time the grunt process
  require('time-grunt')(grunt);

  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    clean: {
      all: ['./public/dest/*', './public/dest/*/'],
      scripts: ['./public/dest/**/*.js'],
      styles: ['./public/dest/**/*.css'],
    },

    eslint: {
      options: {
        configFile: './.eslintrc.js',
        silent: true,
      },
      src: ['./public/js/**/*.js', '!./node_modules/**/*.js'],
    },

    concat: {
      scripts: {
        src: ['./public/templates/stellar/js/**/*.js'],
        dest: './public/dest/concat/concat.js',
      },
      styles: {
        src: ['./public/templates/stellar/css/**/*.css'],
        dest: './public/dest/concat/concat.css',
      },
    },

    copy: {
      main: {
        expand: true,
        cwd: './public/templates/stellar/fonts/',
        src: '**',
        dest: './public/dest/font',
      },
    },

    uglify: {
      development: {
        files: {
          './public/dest/js/script.min.js': ['./public/dest/concat/concat.js'],
        },
      },
    },

    cssmin: {
      options: {
        restructuring: false,
      },
      development: {
        files: {
          './public/dest/css/styles.min.css': [
            './public/dest/concat/concat.css',
          ],
        },
      },
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [
          {
            expand: true,
            cwd: './public',
            src: '/templates/stellar/**/*.html',
            dest: './public',
          },
        ],
      },
    },

    imagemin: {
      static: {
        options: {
          optimizationLevel: 7,
        },
        files: [
          {
            expand: true,
            cwd: './public',
            src: [
              './img/*.{png,jpg,gif}',
              './logo/*.{png,jpg,gif}',
              '!./logo/rentomojo-experience.png',
            ],
            dest: './public/dest/',
          },
        ],
      },
    },

    watch: {
      options: {
        livereload: 3001,
      },
      scripts: {
        files: ['./public/js/*.js'],
        tasks: ['concat:scripts', 'uglify'],
      },
      styles: {
        files: ['./public/css/*.css'],
        tasks: ['concat:styles', 'cssmin'],
      },
      html: {
        files: ['./public/index-large.html'],
        tasks: ['htmlmin'],
      },
    },
  });

  grunt.loadNpmTasks('gruntify-eslint');

  grunt.task.registerTask(
    'js-files',
    'Cleans, Lints and minimises JavaScript files',
    ['eslint', 'clean:scripts', 'concat:scripts', 'uglify'],
  );
  grunt.task.registerTask('css-files', 'Cleans and minimises CSS files', [
    'clean:styles',
    'concat:styles',
    'cssmin',
  ]);

  grunt.task.registerTask('serve', [
    'js-files',
    'css-files',
    'htmlmin',
    // 'imagemin',
    'copy',
    'watch',
  ]);
  grunt.task.registerTask('serve-noimage', [
    'js-files',
    'css-files',
    'htmlmin',
    'copy',
    'watch',
  ]);
  grunt.task.registerTask('build', [
    'clean:all',
    'js-files',
    'css-files',
    'htmlmin',
    'copy',
    'imagemin',
  ]);
};
