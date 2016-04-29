/**
 * Created by alex on 26/04/16.
 */
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        pkg: grunt.file.readJSON('./package.json'),

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'frontend',
            dist: 'dist',
            archive: 'archive'
        },

        // Express suport!
        express: {
            options: {
                port: process.env.PORT || 3000
            },
            dev: {
                options: {
                    script: 'server.js',
                    debug: true
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    node_env: 'production'
                }
            }
        },

        // Open browser
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },

        compress: {
            main: {
                options: {
                    archive: '<%= yeoman.archive %>/<%= buildTag %>.zip',
                    pretty: true
                },
                files: [
                    {expand: true, dot: true, src: ['**', '!<%= yeoman.archive %>/**'], dest: '<%= buildTag %>/'}
                ]
            }
        },

        'git-describe': {
            main: {
                options: {
                    //prop: 'meta.revision'
                }
            }
        },

        gitinfo: {
            options: {
                //cwd: './myproject/ishere'
            }
        },

        sftp: {
            copyarchive_app: {
                files: {
                    "<%= yeoman.archive %>/": "<%= yeoman.archive %>/<%= buildTag %>.zip"
                },
                options: {
                    path: './',
                    host: '',
                    username: '',
                    password: ''
                }
            }
        },

        sshexec: {
            unziparchive_app: {
                command: [],
                options: {
                    host: '',
                    username: '',
                    password: ''
                }
            },
            restart_app: {
                command: [],
                options: {
                    host: '',
                    username: '',
                    password: ''
                }
            }
        },

        env: {
            options: {
                //Shared Options Hash
            },
            test: {
                NODE_ENV : 'test'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/js/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/css/*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    //livereload: '<%= connect.options.livereload %>'
                    livereload: true
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '.tmp/css/*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico,psd}'
                ]
            },
            express: {
                files: [
                    'server.js',
                    'lib/{,*//*}*.{js,json}'
                ],
                tasks: ['newer:jshint:server', 'express:dev'],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: '**/*.css',
                    dest: '.tmp/css/'
                }]
            }
        },

        wiredep: {
            target: {
                src: '<%= yeoman.app %>/index.html', // point to your HTML file.
                ignorePath: '<%= yeoman.app %>/'
                //exclude: [ 'bootstrap-datepicker', 'bootstrap.css', 'bootstrap.js' ]
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/js/{,*/}*.js',
                        '<%= yeoman.dist %>/css/**/*.css'
//                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico,psd}',
//                        '<%= yeoman.dist %>/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            css: '<%= yeoman.dist %>/css/*.css',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/css/*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico,psd}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: '*.js',
                    dest: '.tmp/concat/js'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        '**/*.html',
                        'bower_components/**/*',
                        'images/*',
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images/**/*',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.tmp/js',
                    dest: '<%= yeoman.dist %>/js',
                    src: 'constants.js'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/css',
                dest: '.tmp/css/',
                src: '**/*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles'
            ]
        },

        // Configure a mochaTest task
        mochacli: {
            options: {
                require: ['chai'],
                reporter: ['spec'],
                bail: true
            },
            all: ['spec/api/v1/apiv1_full_spec.js']
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }

    });

    grunt.registerTask('dropdatabase', 'Drop the database', function() {
        // async mode
        var done = this.async();

        var mongoose   = require('mongoose');

        var config = require('./server/config');
        var uri = config.get('db:uri');

        console.log('Will drop db \''+uri+'\'...');

        mongoose.connect(uri); // connect to our database

        mongoose.connection.on('open', function () {
            mongoose.connection.db.executeDbCommand({dropAllIndexes: 'api-people-cinqtechnologies-test'},function(err) {
                if(err) {
                    console.log(err);
                } else {
                    mongoose.connection.db.dropDatabase(function(err) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log('Successfully dropped db \''+uri+'\'');
                        }
                        mongoose.connection.close(done);
                    });
                }
            });
        });
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
        this.async();
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            //return grunt.task.run(['build', 'connect:dist:keepalive']);
            return grunt.task.run(['build', 'express:prod', 'open', 'express-keepalive']);
        }

        grunt.task.run([
            'clean:server',
//      'bower-install',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            //'connect:livereload',
            'express:dev',
            //'open',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('save-buildtag', function() {

        grunt.event.once('git-describe', function (rev) {
            grunt.option('gitRevision', rev);

            var name = grunt.config('pkg').name || 'app';
            var branch_name = grunt.config('gitinfo').local.branch.current.name;
            var date = grunt.template.today('yyyy_mm_dd-HH_MM');
            var date2 = grunt.template.today('isoDateTime');
            var commit = rev.object;
            var dirty = rev.dirty;

            var buildTag = name + '_' + branch_name + '-' + date + '-' + commit;

            if (dirty) {
                buildTag = buildTag.concat( dirty );
            }
            grunt.log.writeln("Build tag: " + buildTag);
            grunt.config.set('buildTag', buildTag);

            grunt.file.write('version.json', '// Automatically generated on every Grunt build (task \'save-buildtag\')\n' + JSON.stringify({
                    name: name,
                    branch: branch_name,
                    date: date2,
                    revision: commit + dirty
                }));
        });

        grunt.task.run('git-describe');
    });

    grunt.registerTask('test', [
        'env:test',
        'clean:server',
//    'jasmine_node',
        //'concurrent:test',
        //'autoprefixer',
        'dropdatabase',
        'mochacli'
//    'connect:test',
//    'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
//    'bower-install',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('archive', [
        'gitinfo',
        'save-buildtag',
        'compress'
    ]);

    grunt.registerTask('deploy_app', [
        'archive',
        'sftp:copyarchive_app',
        'sshexec:unziparchive_app',
        'sshexec:restart_app'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

};
