const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: "development",
    devServer: {
        hot: true,
        open: true,
        static: path.resolve(__dirname, "..", "build"),
        devMiddleware: {
            writeToDisk: true,
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: "sass-loader",
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "..", "src/assets"),
                    to: path.resolve(__dirname, "..", "build/assets")
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "src/index.html"),
            scriptLoading: "defer"
        }),
    ],
});