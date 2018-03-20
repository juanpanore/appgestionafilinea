// eslint-disable-next-line
const merge = require("webpack-merge");
// eslint-disable-next-line
const webpack = require("webpack");
const path = require("path");
const common = require("./webpack.common.js");
// eslint-disable-next-line
const CopyWebpackPlugin = require("copy-webpack-plugin");
// eslint-disable-next-line
const CleanWebpackPlugin = require("clean-webpack-plugin");

const serverPort = 3000;

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  entry: [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://localhost:${serverPort}`,
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "src", "index.jsx")
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    publicPath: "/public/",
    historyApiFallback: true,
    open: true,
    port: serverPort,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "static", "index.html"),
        to: path.resolve(__dirname, "dist", "index.html"),
        toType: "file"
      }
    ])
  ]
});
