// TO DO: css min

module.exports = function (grunt) {

    // Load the plugins tasks 
    require('load-grunt-tasks')(grunt);

    // Tablica zawierająca zewnętrzne javascripty, które chcemy konkatenować do vendor.js
    var vendorJs = [
        // 'bower_components/jquery/dist/jquery.min.js',
        // 'bower_components/tether/dist/js/tether.min.js',
        // 'bower_components/bootstrap/js/dist/util.js',
        // 'bower_components/bootstrap/js/dist/collapse.js'
    ];
    // Project configuration.
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['dev/js/*.js'],
                tasks: ['js']
            },
            sass: {
                files: ['dev/css/*.scss'],
                tasks: ['sass:dev']
            },
            options: {
                spawn: false,
                livereload: false,
                event: ['added', 'changed']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'build/css/*.css',
                        'build/js/*.js',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },
        clean: {
            dist: ['build/js/*', 'build/css/*', 'build/img/*, dev/temp/*']
        },
        concat: {
            dev: {
                files: {
                    // 'build/js/vendor.js': [vendorJs],
                    'dev/temp/scripts.js': ['dev/js/*.js']
                }
            },
            dist: {
                files: {
                    // 'dev/temp/vendor.js': [vendorJs],
                    'dev/temp/scripts.js': ['dev/js/*.js']
                }
            }
        },
        babel: {
            dist: {
                options: {
                    sourceMap: false,
                    presets: ['es2015']
                },
                files: {
                    'dev/temp/scripts5.js': 'dev/temp/scripts.js'
                }
            },
            dev: {
                options: {
                    sourceMap: true,
                    presets: ['es2015']
                },
                files: {
                    'build/js/scripts5.js': 'dev/temp/scripts.js'
                }
            }
        },
        uglify: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'build/js/scripts.js.min': 'dev/temp/scripts5.js'
                }
            }
        },
        sass: {
            options: {
                sourceMap: false,
                includePaths: [
                    // 'bower_components/font-awesome/scss',
                    'bower_components/bootstrap/scss'
                ]
            },
            dev: {
                files:
                [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.scss'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            },
            dist: {
                files:
                [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.scss'],
                    dest: 'dev/css/',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            options: {
                sourceMap: false,
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            dist: {
                files:
                [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.css'],
                    dest: 'build/css/',
                    ext: '.min.css'
                }]
            }
        },
        imagemin: {
            dist: {
                // files: {
                //     'build/img/original.png': 'dev/img/original.png'
                // }
                files: [{
                    expand: true,                  // Enable dynamic expansion 
                    cwd: 'dev/img/',                   // Src matches are relative to this path 
                    src: ['*.{png,jpg,gif}'],   // Actual patterns to match 
                    dest: 'build/img/'
                }]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['clean', 'sass:dev', 'concat:dev', 'babel:dev', 'img', 'browserSync', 'watch']);
    grunt.registerTask('css', ['newer:sass:dist']);
    grunt.registerTask('css-force', ['sass:dev', 'cssmin']);
    grunt.registerTask('js', ['newer:concat', 'newer:babel']);
    grunt.registerTask('js-force', ['concat', 'babel']);
    grunt.registerTask('img', ['imagemin']);
    grunt.registerTask('dist', ['clean', 'sass:dist', 'cssmin', 'concat:dist', 'babel:dist', 'uglify', 'img'])

};