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
			{ test: /\.scss$/, loaders: ["style", "css", "sass"] },
			{ test: /\.js$/, include: /app/, loader: "babel-loader" },
			{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
		]
	},
	resolve: {
		modulesDirectories: ['node_modules', 'web_modules', 'bower_components'],
		extensions: ['', '.js', '.jsx', '.json', '.scss', '.sass', '.less'],
		alias: {
            "npm": 'node_modules',
            "TweenLite": __dirname + '/node_modules/gsap/src/uncompressed/TweenLite.js',
            "TweenMax": __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js',
            "TimelineLite": __dirname + '/node_modules/gsap/src/uncompressed/TimelineLite.js',
            "TimelineMax": __dirname + '/node_modules/gsap/src/uncompressed/TimelineMax.js',
            "scrollmagic": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
            "animation.gsap": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js',
            "debug.addIndicators": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
    }
	},
	devtool: "source-map",
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};
