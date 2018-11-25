const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { STATIONS_FOR_TRAIN_LINE_URL, REAL_TIME_FOR_STATION } = require("./src/constants");

const filesToCopy = [
    "./subway_map.pdf",
    "./manifest.json",
    "./robots.txt",
    { from: "./images", to: "images/" }
];

const DIST_DIRECTORY = "dist";

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js"
    },

    optimization: {
        runtimeChunk: {
            name: "runtime"
        }
    },

    plugins: [
        new CleanPlugin([DIST_DIRECTORY]),
        new CopyPlugin(filesToCopy),
        new HtmlPlugin({
            template: path.resolve(__dirname, "./index.html"),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: "sw.js",
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp(REAL_TIME_FOR_STATION),
                    handler: "networkFirst"
                },
                {
                    urlPattern: new RegExp(STATIONS_FOR_TRAIN_LINE_URL),
                    handler: "staleWhileRevalidate"
                }
            ]
        })
    ]
}