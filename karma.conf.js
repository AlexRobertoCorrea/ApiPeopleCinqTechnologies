/**
 * Created by alex on 26/04/16.
 */
// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath : './',
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'frontend/bower_components/angular/angular.js',
            'frontend/bower_components/angular-mocks/angular-mocks.js',
            'frontend/bower_components/angular-resource/angular-resource.js',
            'frontend/bower_components/angular-sanitize/angular-sanitize.js',
            'frontend/bower_components/angular-ui-router/release/angular-ui-router.js',
            'frontend/bower_components/angular-route/angular-route.js',
            'frontend/bower_components/angular-animate/angular-animate.js',
            'frontend/bower_components/angular-ui-utils/ui-utils.js',
            'frontend/bower_components/moment/moment.js',
            'frontend/bower_components/angular-moment/angular-moment.js',
            'frontend/bower_components/angular-slugify/angular-slugify.js',
            'frontend/bower_components/allmighty-autocomplete/script/autocomplete.js',
            'frontend/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
            'frontend/bower_components/ng-device-detector/ng-device-detector.js',
            'frontend/bower_components/re-tree/re-tree.js',
            'frontend/bower_components/underscore/underscore.js',
            'frontend/bower_components/html5shiv/dist/html5shiv.js',
            'frontend/bower_components/es5-shim/es5-shim.js',
            'frontend/js/*.js',
            'frontend/js/**/*.js',
            'test/spec/**/*.js',
            'frontend/templates/**/*.html'
        ],

        preprocessors: {
            'frontend/templates/**/*.html': ["ng-html2js"]
        },

        ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
            stripPrefix: "frontend/"
            //prependPrefix: "frontend/templates/",

            // the name of the Angular module to create
            //moduleName: "my.templates"
        },

        autoWatch : true,

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
