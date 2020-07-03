const Path = require('path');
const PATHS = {
  ROOT: Path.resolve(), // the root path, where your webpack.config.js is located.
  SRC: Path.resolve('client/src'), // the root path, where your webpack.config.js is located.
  JS: Path.resolve('javascript'), // the root path to your built files
};

module.exports = {
    entry: {
        script: [
            `${PATHS.SRC}/scripts.js`
        ]
    },
    output: {
        path: PATHS.ROOT,
        filename: 'client/dist/[name].js',
        publicPath: PATHS.ROOT
    }
};
