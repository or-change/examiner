const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const BABEL_OPTIONS = {
	presets: [
		[
			'@babel/env',
			{
				targets: {
					ie: '9'
				}
			},
		],
	],
	plugins: [
		'@babel/transform-runtime'
	],
	sourceType: 'unambiguous'
};

module.exports = function WebpackBase(options) {
	return {
		entry: {
			bundle: [
				'@babel/polyfill/dist/polyfill.min.js',
				path.resolve(__dirname, '../../app/product.js')
			].concat(options.entries).concat([
				path.resolve(__dirname, '../../app/index.js')
			])
		},
		output: {
			filename: '[name].js',
			path: path.resolve('output/.public'),
			publicPath: options.publicPath
		},
		target: 'web',
		resolve: {
			extensions: ['.js', '.vue']
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						loaders: {
							scss: 'style-loader!css-loader!sass-loader'
						}
					}
				},
				{
					test: /\.js$/,
					exclude(file) {
						return /node_module/.test(file) && !/@or-change/.test(file);
					},
					use: {
						loader: 'babel-loader',
						options: BABEL_OPTIONS
					}
				},
				{
					test: /\.(eot|woff|woff2|svg|ttf)$/,
					loader: 'file-loader'
				},
				{
					test: /\.scss$/,
					use: [
						'vue-style-loader',
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.css$/,
					use: [
						'vue-style-loader',
						'css-loader'
					]
				}
			]
		},
		plugins: [
			new VueLoaderPlugin()
		],
		optimization: {
			splitChunks: {
				name: true,
				cacheGroups: {
					commons: {
						test: /node_modules/,
						name: 'vendors',
						chunks: 'all'
					}
				},
			}
		},
		node: false
	};
};