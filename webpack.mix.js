let mix = require('laravel-mix');

// const package = require('./package.json');
// const extract = Object.keys(package.devDependencies);

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
	// .extract(extract)
	// .sourceMaps()
	// .version()
   .sass('resources/assets/sass/app.scss', 'public/css');
	// .sourceMaps()
	// .version()