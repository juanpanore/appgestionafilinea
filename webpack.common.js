const path = require("path");
// eslint-disable-next-line
const webpack = require("webpack");
// eslint-disable-next-line
const CleanWebpackPlugin = require("clean-webpack-plugin");
// eslint-disable-next-line
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  context: __dirname,
  output: {
    filename: "[name].bundle.js",
    publicPath: "/dist/",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          fix: true
        }
      },
      {
        test: /.jsx?$/,
        use: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        include: /flexboxgrid/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
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
};

module.exports = config;
