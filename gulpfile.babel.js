import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import jsdoc from 'gulp-jsdoc3';
import rimraf from 'gulp-rimraf';
import flow from 'gulp-flowtype';
import eslint from 'gulp-eslint';
import replace from 'gulp-replace';
import coveralls from 'gulp-coveralls';
import { Server as KarmaServer } from 'karma';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

import config from './package.json';
import jsdocConfig from './.jsdoc.json';

let currentEnv = process.env.NODE_ENV;
const isBuild = gutil.env.env === 'build';

function setEnv(env) {
  currentEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = env;
}

function restoreEnv() {
  process.env.NODE_ENV = currentEnv;
}

gulp.task('flow', () => (
  gulp.src(config.files.sources)
    .pipe(flow({
      all: true,
      abort: isBuild,
    }))
));

gulp.task('flow:watch', gulp.parallel('flow', () => (
  gulp.watch(config.files.sources, gulp.parallel('flow'))
)));

gulp.task('eslint:tests', () => (
  gulp.src(config.files.tests.concat(['gulpfile.babel.js']))
    .pipe(eslint({
      envs: ['mocha', 'browser'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'no-unused-expressions': 0,
        'no-underscore-dangle': 0,
        'flowtype/require-return-type': 0,
        'flowtype/require-parameter-type': 0,
      },
    }))
    .pipe(eslint.format())
    .pipe(isBuild ? eslint.failAfterError() : gutil.noop())
));

gulp.task('eslint', gulp.series('eslint:tests', () => (
  gulp.src(config.files.sources)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(isBuild ? eslint.failAfterError() : gutil.noop())
)));

gulp.task('eslint:watch', gulp.parallel('eslint', () => (
  gulp.watch(config.files.sources, gulp.parallel('eslint'))
)));

gulp.task('karma', (done) => {
  setEnv('test');

  new KarmaServer({
    configFile: `${process.cwd()}/karma.conf.js`,
    singleRun: isBuild,
  }, () => {
    restoreEnv();

    gulp.src('./coverage/lcov.info')
      .pipe(replace(`${process.cwd()}/`, './'))
      .pipe(gulp.dest('./coverage/'))
      .on('end', done);
  }).start();
});

gulp.task('clean', (done) => {
  const dirsToClean = [config.files.es2015, config.files.docs];
  const availableDirectories = [];

  dirsToClean.forEach((dir) => {
    try {
      fs.statSync(dir);
      availableDirectories.push(dir);
    } catch (e) { gutil.noop(); }
  });

  if (availableDirectories.length > 0) {
    return gulp.src(availableDirectories)
      .pipe(rimraf())
      .on('done', done);
  }

  return done();
});

gulp.task('build:es2015', gulp.series('clean', () => (
  gulp.src(config.files.sources)
    .pipe(babel({
      babelrc: false,
      plugins: ['babel-plugin-transform-flow-strip-types'],
    }))
    .pipe(gulp.dest(config.files.es2015))
)));

gulp.task('coveralls', () => (
  gulp.src('coverage/lcov.info')
    .pipe(coveralls())
));

gulp.task('build', () => (
  gulp.src(config.files.sources)
    .pipe(babel({
      babelrc: false,
      plugins: ['remove-comments', 'babel-plugin-transform-flow-strip-types',
        ["module-alias", [
          { "src": "./src/lib/utils", "expose": "utils" },
          { "src": "./src/lib/models", "expose": "models" },
          { "src": "./src/lib", "expose": "lib" },
        ]]],
    }))
    .pipe(gulp.dest(config.files.build))
));

gulp.task('build:watch', gulp.parallel('build', () => (
  gulp.watch(config.files.sources, gulp.series('build'))
)));

gulp.task('build:dist', () => (
  gulp.src(config.files.sources)
    .pipe(babel())
    .pipe(concat('bundle.js'))
    .pipe(uglify({}))
    .pipe(gulp.dest('./dist/dist'))
));

gulp.task('build:dist:watch', () => (
  gulp.watch(config.files.sources, gulp.series('build:dist'))
));

gulp.task('docs', gulp.series('clean', 'build:es2015', () => (
  gulp.src(config.files.docsSources)
    .pipe(jsdoc(jsdocConfig))
    .pipe(gulp.dest(config.files.docs))
)));

gulp.task('default', gulp.parallel('clean', 'karma', 'flow:watch', 'eslint:watch'));
