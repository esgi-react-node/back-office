"use strict";

const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
                    process.env.NODE_ENV === "development" && "eslint-loader"
                ].filter(Boolean)
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    "file-loader",
                    process.env.NODE_ENV === "production" && "image-webpack-loader"
                ].filter(Boolean)
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
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve("src", "static"),
                    to: resolve("dist")
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: resolve("src", "index.html"),
            inject: false
        })
    ],
    devServer: {
        host: "0.0.0.0",
        port: 9000,
        clientLogLevel: "info",
        contentBase: resolve("dist"),
        overlay: true,
        watchContentBase: true,
        writeToDisk: true,
        historyApiFallback: true
    }
};
