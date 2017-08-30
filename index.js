const through = require('through2');
const path = require('path');
const { PluginError } = require('gulp-util');
const applySourceMap = require('vinyl-sourcemaps-apply');
let rollup = require('rollup');

const PLUGIN_NAME = 'gulp-eagle-rollup';

module.exports = options => (
  through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      return this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    options.input = path.relative(file.cwd, file.path);

    rollup = options.rollup || rollup;
    delete options.rollup;

    const createSourceMap = file.sourceMap !== undefined;
    let generateOptions = options.output;

    generateOptions.sourcemap = createSourceMap;

    rollup
      .rollup(options)
      .then(bundle => {
        this.emit('bundle', bundle);

        return bundle.generate(generateOptions);
      })
      .then(result => {
        const { code, map } = result;

        if (createSourceMap) {
          map.file = options.input;
          map.sources = map.sources.map(source => path.relative(file.cwd, source));
          applySourceMap(file, map);
        }

        file.contents = new Buffer(code);

        cb(null, file);
      })
      .catch(err => {
        cb(new PluginError(PLUGIN_NAME, err));
      });
  })
);
