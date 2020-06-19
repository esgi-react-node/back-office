"use strict";

const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log(process.env.NODE_ENV);

module.exports = {
    mode: process.env.NODE_ENV || "production",
    entry: resolve("src", "index.js"),
    output: {
        path: resolve("dist"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    "babel-loader",
                    process.env.NODE_ENV && "eslint-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            ".js",
            ".jsx"
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve("src", "index.html"),
            inject: "head"
        })
    ],
    devServer: {
        host: "0.0.0.0",
        port: 9000,
        clientLogLevel: "info",
        contentBase: resolve("dist"),
        historyApiFallback: true,
        overlay: true,
        watchContentBase: true
    }
};
