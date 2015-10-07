'use strict';

let join = require("path").join;

let webpack = require("webpack");

let buildOutputDir = join(__dirname, "static");
let appEntryPoint = join(__dirname, "app", "main.js");

module.exports = {
	entry: [
		"webpack-hot-middleware/client",
		appEntryPoint
	],
	output: {
		path: buildOutputDir,
		filename: "bundle.js",
		publicPath: "/static/"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.js$/, include: /app/, loader: "babel-loader" },
			{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
		]
	},
	devtool: "source-map",
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};
