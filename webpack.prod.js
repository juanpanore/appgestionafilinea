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
const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "production",
    entry: [path.resolve(__dirname, "./src/index.jsx")],
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "static", "index.html"),
                to: path.resolve(__dirname, "dist", "index.html"),
                toType: "file"
            }
        ])
        /* new HtmlWebpackPlugin({
        inject: true
      }) */
    ]
});
