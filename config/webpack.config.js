const path = require('path');
const glob = require('glob');
const fs = require('fs');

const config = require('./site.config');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');
const commonFunctions = require('./commonFunctions');

const htmlFilePaths = commonFunctions.list('./src/*.html');

const getIOPaths = () => {
  const inputPaths = {};
  htmlFilePaths.map((filePath) => {
    const respectiveDirectory = filePath.substring(6).slice(0, -5);
    const jsPath = path.join(config.root, config.paths.src, 'javascripts', respectiveDirectory, 'index.js');
    const cssPath = path.join(config.root, config.paths.src, 'stylesheets', respectiveDirectory, 'style.scss');
    const assetsPresent = [fs.existsSync(jsPath)
      && jsPath, fs.existsSync(cssPath) && cssPath].filter(Boolean);
    if (assetsPresent.length) {
      inputPaths[respectiveDirectory] = assetsPresent;
    }
  });
  return inputPaths;
};

const inputPaths = getIOPaths();

const ASSET_PATH = '/';

module.exports = {
  context: path.join(config.root, config.paths.src),
  entry: inputPaths,
  output: {
    path: path.join(config.root, config.paths.dist),
    filename: 'build/[name].[hash].js',
    publicPath: ASSET_PATH,
  },
  mode: ['production', 'development'].includes(config.env)
    ? config.env
    : 'development',
  devtool: config.env === 'production'
    ? 'hidden-source-map'
    : 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(config.root, config.paths.src),
    watchContentBase: true,
    hot: true,
    open: true,
    port: config.port,
    host: config.dev_host,
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/talents/,
          to: '/talents.html',
        },
        {
          from: /^\/search/,
          to: '/search.html',
        },
      ],
    },
  },
  module: {
    rules: loaders,
  },
  plugins,
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      name: config.env === 'development',
      maxInitialRequests: 25,
      maxAsyncRequests: 25,
    },
  },
};
