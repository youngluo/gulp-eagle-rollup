const gulp = require('gulp');
const rollup = require('./index');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');

gulp.task('default', function () {
  return gulp
    .src('./test/b.js')
    .pipe(rollup({
      output: {
        format: 'iife'
      },
      plugins: [
        nodeResolve({ browser: true, main: true, jsnext: true }),
        commonjs(),
        buble()
      ]
    }, 'app.js'))
    .pipe(gulp.dest('./dist/js'));
});
