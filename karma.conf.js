var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],

    singleRun: true,

    frameworks: [ 'chai','mocha' ],

    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],    

    files: [
      './resources/assets/tests.webpack.js'
    ],

    preprocessors: {
      './resources/assets/tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots' ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, 
            exclude: /node_modules/,
            loader: 'babel-loader' }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }

  });
};
