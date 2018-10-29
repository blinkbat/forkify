

// include built-in node module 'path'
const path = require('path');

// include html webpack plugin
const htmlWebpackPlugin = require('html-webpack-plugin');

// config object
module.exports = {

	// entry points, outputs, loaders, & plugins (oh my)

	// entry point
	entry: [ 'babel-polyfill', './src/js/index.js' ],

	// output obj
	output: {
		// must be an absolute path
		path: path.resolve( __dirname, 'dist' ),
		filename: 'js/bundle.js'
	},

	// dev server
	devServer: {
		contentBase: './dist'
	},

	// plugins - note this is an arr
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	],

	// loaders
	module: {
		rules: [
			{
				// regex for js files
				test: /\.js$/,
				// regex for node_modules exclude
				exclude: /node_modules/,
				use: { loader: 'babel-loader' }
			}
		]
	}

	// compression mode (currently set in package.json)
	//mode: 'development'

};




