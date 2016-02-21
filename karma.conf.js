var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    singleRun: true,

    frameworks: [ 'mocha' ],

    files: [
      './resources/assets/tests.webpack.js'
    ],

    preprocessors: {
      './resources/assets/tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    plugins: [

      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],    

    reporters: [ 'mocha' ],

    webpack: { //kind of a copy of your webpack config
        devtool: 'inline-source-map', //just do inline source maps instead of the default
        module: {
            loaders: [
              {
                  test: /\.js$/,
                  loader: 'babel',
                  query: {
                      // https://github.com/babel/babel-loader#options
                      cacheDirectory: true,
                      presets: ['react','es2015', 'stage-0']
                  }
              }            
                // { test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader' },
                // { test: /\.js$/, exclude: [/test/, /node_modules/], loader: 'isparta'},
                // { test: /\.less$/, include: [/src\/main\/less/], exclude: [/node_modules/, /dist/], loader: "style!css!less" },
            ]
        }
    },    

    webpackServer: {
      noInfo: true
    }

  });
};
