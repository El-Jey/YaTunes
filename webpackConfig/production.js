const path = require('path');
const CssMinify = require("css-minimizer-webpack-plugin");
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: "production",
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
                        loader: MiniCssExtractPlugin.loader
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
        new MiniCssExtractPlugin({
            filename: "../build/styles/[id].[fullhash].css",
        }),
        new TerserPlugin(),
    ],
    optimization: {
        minimizer: [
            new CssMinify(),
        ],
    },
});