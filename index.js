const through = require('through2');
const path = require('path');
const { PluginError } = require('gulp-util');
let rollup = require('rollup');

module.exports = options => (
  through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      return this.emit('error', PluginError('gulp-eagle-rollup', 'Streaming not supported'));
    }

    options.input = path.relative(file.cwd, file.path);

    rollup = options.rollup || rollup;
    delete options.rollup;

    rollup
      .rollup(options)
      .then(bundle => {
        this.emit('bundle', bundle);

        return bundle.generate(options.output);
      })
      .then(result => {
        const { code } = result;

        file.contents = new Buffer(code);

        cb(null, file);
      });
  })
);
