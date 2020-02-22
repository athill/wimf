let mix = require('laravel-mix');

//// TODO: source maps and extract modules
// add dirnames of all top-level in node_modules

const extract = [ 'axios', 'bootstrap-sass', 'lodash', 'react', 'react-dom'];
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.autoload({
    jquery: ['$', 'window.jQuery',"jQuery","window.$","jquery","window.jquery"]
});

mix.react('resources/assets/js/app.js', 'public/js')
	.version()
    .sass('resources/assets/sass/app.scss', 'public/css')
	.sourceMaps(true, 'source-map')
	.webpackConfig({devtool: 'source-map'})
	.version()
	;