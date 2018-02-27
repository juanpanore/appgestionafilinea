// eslint-disable-next-line
const merge = require("webpack-merge");
// eslint-disable-next-line
const webpack = require("webpack");
const path = require("path");
const common = require("./webpack.common.js");

const serverPort = 3000;

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  entry: [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://localhost:${serverPort}`,
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "./src/index.jsx")
  ],
  devServer: {
    inline: true,
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: serverPort,
    publicPath: "/dist/",
    historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
