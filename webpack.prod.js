const path = require("path");
// eslint-disable-next-line
const merge = require("webpack-merge");
// eslint-disable-next-line
const webpack = require("webpack");
// eslint-disable-next-line
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
// eslint-disable-next-line
const CleanWebpackPlugin = require("clean-webpack-plugin");
// eslint-disable-next-line
const CopyWebpackPlugin = require("copy-webpack-plugin");
// eslint-disable-next-line
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common");

const conf = merge(common, {
	mode: "production",
	entry: path.resolve(__dirname, "./src/index.jsx"),
	output: {
		path: path.resolve(__dirname, "dist","gestionpagosprevencion"),  
		filename: '[name]-[chunkhash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: ''
	},
	devtool: "source-map",
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new CleanWebpackPlugin(["dist"]),
		new UglifyJSPlugin({
			sourceMap: true,
			parallel: true
		}),
		new HtmlWebpackPlugin({
			title: 'Prevención ARL',
      inject: 'body',
      template: 'static/indexProduction.html',
		})
	]
});
module.exports = conf;
