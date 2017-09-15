let mix = require('laravel-mix');

//// TODO: source maps and extract modules
// const package = require('./package.json');
// const extract = Object.keys(package.devDependencies);
// console.log(extract);

const extract = [ 'axios', 'jquery', 'lodash', 'react', 'react-dom'];
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

mix.react('resources/assets/js/app.js', 'public/js')
	.extract(extract)
	// .sourceMaps()
	.version()
   .sass('resources/assets/sass/app.scss', 'public/css')
	// .sourceMaps()
	.version()
	;