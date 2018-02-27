const path = require("path");
// eslint-disable-next-line
const merge = require("webpack-merge");
// eslint-disable-next-line
const webpack = require("webpack");
// eslint-disable-next-line
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  entry: [path.resolve(__dirname, "./src/index.jsx")],
  devtool: "source-map",
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
});
