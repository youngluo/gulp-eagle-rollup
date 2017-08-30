# gulp-eagle-rollup

[![npm](https://img.shields.io/npm/v/gulp-eagle-rollup.svg)](https://www.npmjs.com/package/gulp-eagle-rollup)
[![license](https://img.shields.io/github/license/youngluo/gulp-eagle-rollup.svg)](https://github.com/youngluo/gulp-eagle-rollup/blob/master/LICENSE)

A Gulp plugin for Rollup.

## Usage

```
const gulp = require('gulp');
const eagleRollup = require('gulp-eagle-rollup');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');

gulp.task('default', function () {
  return gulp
    .src('./test/b.js')
    .pipe(eagleRollup({
      output: {
        format: 'iife'
      },
      plugins: [
        nodeResolve({ browser: true, main: true, jsnext: true }),
        commonjs(),
        buble()
      ]
    }))
    .pipe(gulp.dest('./dist'));
});
```

## Options

`eagleRollup(rollupOptions)`

- `rollupOptions` - the same object as `rollup.rollup(options)`. And you can specify rollup by `rollupOptions.rollup`.


