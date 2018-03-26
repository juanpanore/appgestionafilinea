// eslint-disable-next-line
const merge = require("webpack-merge");
// eslint-disable-next-line
const webpack = require("webpack");
const path = require("path");
const common = require("./webpack.common.js");

const serverPort = 9630;

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
    plugins: [new webpack.HotModuleReplacementPlugin()]
});
