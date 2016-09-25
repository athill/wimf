var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    singleRun: true,

    frameworks: [ 'mocha' ],

    files: [
      './resources/assets/tests/index.js'
    ],

    preprocessors: {
      './resources/assets/tests/index.js': [ 'webpack', 'sourcemap' ]
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
            preLoaders: [
              {
                  test: /\.js$/,
                  exclude: [
                      // path.resolve('src/components/'),
                      path.resolve('node_modules/')
                  ],                  
                  loader: 'babel',
                  query: {
                      // https://github.com/babel/babel-loader#options
                      cacheDirectory: true
                  }
              },
              { 
                test: /\.css$/, 
                loader: "style-loader!css-loader"
              },              
              //// instrument only testing sources with Istanbul
              // {
              //     test: /\.js$/,
              //     include: path.resolve('resources/assets/src'),
              //     loader: 'istanbul-instrumenter',
              //     query: {
              //         esModules: true
              //     }
              // }
                // { test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader' },
                // { test: /\.js$/, exclude: [/test/, /node_modules/], loader: 'isparta'},
                // { test: /\.less$/, include: [/src\/main\/less/], exclude: [/node_modules/, /dist/], loader: "style!css!less" },
            ]
        }
    },    

    webpackServer: {
      noInfo: true
    },
    // reporters: [ 'progress', 'coverage' ],
    // coverageReporter: {
    //     type: 'text'
    // },

  });
};
