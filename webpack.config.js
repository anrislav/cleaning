const path = require('path')
const CopyPlug = require('copy-webpack-plugin')
const CssPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// const HtmlPlug = require('')

module.exports = {
	mode: 'production',
	entry: './src/main.ts',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
					'ts-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					CssPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: {
								filter: url => {
									if (url.includes('img')) return false
								},
							},
						},
					},
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new CopyPlug({
			patterns: [{ from: './src/static' }, { from: './src/img', to: './img' }],
		}),
		new CssPlugin({
			filename: 'styles.css',
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'all',
		},
	},
}
