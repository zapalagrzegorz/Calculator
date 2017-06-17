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
                tasks: ['concat:dev', 'babel']
            },
            sass: {
                files: ['dev/css/*.scss'],
                tasks: ['sass']
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
            dist: ['build/js/*', 'build/css/*', 'build/img/*']
        },
        concat: {
            // dist: {
            //     files: {
            //         'build/js/scripts.js' : [vendorJs, 'dev/js/main.js']
            //     }
            // },
            dev: {
                files: {
                    'build/js/vendor.js': [vendorJs],
                    'build/js/scripts.js': ['dev/js/*.js']
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'build/js/scripts5.js': 'build/js/scripts.js'
                }
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'build/js/scripts5.js.min': 'build/js/scripts5.js'
                }
            }
        },
        sass: {
            options: {
                sourceMap: false,
                includePaths: [
                    'bower_components/font-awesome/scss',
                    'bower_components/bootstrap/scss'
                ]
            },
            dist: {

                files:
                [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.scss'],
                    dest: 'build/css/',
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
                files: {}
            },
            build: {}
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,                  // Enable dynamic expansion 
                    cwd: 'img/src/',                   // Src matches are relative to this path 
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
                    dest: 'dist/'
                }]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('css', ['newer:sass', 'newer:cssmin']);
    grunt.registerTask('css-force', ['sass', 'cssmin']);
    grunt.registerTask('js', ['concat:dev', 'newer:babel', 'newer:uglify']);
    grunt.registerTask('img', ['newer:imagemin']);

};