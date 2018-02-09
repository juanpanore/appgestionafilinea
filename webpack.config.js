const path = require("path");

const config = {
    entry: path.resolve(__dirname, "./src/index.jsx"),
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".css"]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 3000,
        publicPath: "/public/",
        historyApiFallback: true
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
    }
};

module.exports = config;
