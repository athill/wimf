var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var util = require('util');
var webpack = require('webpack');
// var autoprefixer = require('autoprefixer');
var pkg = require('../package.json');

console.log('env', process.env.NODE_ENV); 
var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var jsBundle = path.join('js', '[name].js');
var entry = {
    app: "./app.js",
    vendor: [
      'axios',
      'classnames',
      'moment',
      'lodash',
      'react',
      'react-bootstrap',
      'react-datepicker',
      'react-dom',
      'react-redux',
      'redux',
      'redux-actions',
      'redux-form',
      'redux-logger',
      'redux-mock-store',
      'redux-promise',
      'redux-thunk',
    ],
};

//// plugins
var cssBundle = path.join('css', util.format('[name].%s.css', pkg.version));
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */path.join('js', "vendor.bundle.js")),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
];
if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else if (!TEST) {
  plugins.push(
    new ExtractTextPlugin(cssBundle, {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  );
}

// if (DEBUG) {
//   entry.app.push(
//     util.format(
//       'webpack-dev-server/client?http://%s:%d',
//       pkg.config.devHost,
//       pkg.config.devPort
//     )
//   );
//   entry.app.push('webpack/hot/dev-server');
// }

var context = path.join(__dirname, '../resources/assets');
var config = {
  context: context,
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG || TEST ? 'inline-source-map' : 'source-map',
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: jsBundle,
    pathinfo: false
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
	          exclude: /node_modules/,            
            loader: 'babel',
            query: {
                // https://github.com/babel/babel-loader#options
                cacheDirectory: true,
                presets: ['react','es2015', 'stage-0']
            }
        },
        { 
          test: /\.css$/, 
          loader: "style-loader!css-loader"
        },
    ],
  },

  postcss: [
    require('autoprefixer-core')
  ],

  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  // devServer: {
  //   contentBase: path.resolve(pkg.config.buildDir),
  //   hot: true,
  //   noInfo: false,
  //   inline: true,
  //   stats: { colors: true }
  // }
};

module.exports = config;
