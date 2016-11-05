var path = require('path');
var istanbul = require('browserify-istanbul');

var basePath = path.resolve(process.cwd(), './src/lib');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'browserify'],
    reporters: ['coverage', 'mocha'],
    files: [
      'src/**/*.js',
      'tests/**/*.js',
    ],
    preprocessors: {
      'src/**/*.js': ['browserify', 'env'],
      'tests/**/*.js': ['browserify', 'env'],
    },
    browserify: {
      debug: true,
      configure: function (bundle) {
        bundle.once('prebundle', function () {
          bundle.transform('babelify').transform(istanbul)
        });
      },
      paths: [basePath]
    },
    coverageReporter: {
      instrumenters: { isparta: require('isparta') },
      instrumenter: {
        'src/**/!(*.spec).js': 'isparta'
      },
      reporters: [
        { type: 'text-summary' },
        { type: 'lcovonly', file: './../lcov.info' },
        { type: 'html', dir: 'coverage/' }
      ]
    },
    envPreprocessor: ['NODE_ENV'],
  });
};
