

// include built-in node module 'path'
const path = require('path');

// config object
module.exports = {

	// entry point
	entry: './src/js/index.js',

	// output obj
	output: {
		// must be an absolute path
		path: path.resolve( __dirname, 'dist/js' ),
		filename: 'bundle.js'
	},

	// compression mode (currently set in package.json)
	//mode: 'development'

};




