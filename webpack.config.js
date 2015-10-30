var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './assets/js/scriptmain.jsx'),
	output: {
    	path: path.resolve(__dirname, './assets/js'),
    	filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/, 
			loader: 'babel-loader'
		}, {
			test: /\.jsx?$/,
			loader: 'uglify-loader'
		}]
	}
};