const path = require("path");
// eslint-disable-next-line
const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    context: __dirname,
    output: {
        filename: "[name].bundle.js",
        publicPath: "/dist/",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".css"],
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true,
		    children: false,
    },

    module: {
        rules: [
            {
                test: /.jsx?$/,
                enforce: "pre",
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    fix: true,
                },
            },
            {
                test: /.jsx?$/,
                use: "babel-loader",
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {},
                    },
                ],
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                include: /flexboxgrid/,
            },
      			{
      				test: /\.html$/,
      				loader: 'html-loader'
      			},
        ],
    },
};

module.exports = config;
