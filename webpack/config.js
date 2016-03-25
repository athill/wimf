var path = require('path');
var util = require('util');
// var autoprefixer = require('autoprefixer');
var pkg = require('../package.json');

var plugins = require('./plugins');

var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var jsBundle = path.join('js', '[name].js');

var entry = {
  app: ['./app.js']
};

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
