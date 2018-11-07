const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const filesToCopy = [
    "./index.html",
    "./sw.js",
    "./subway_map.pdf"
];

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "mta.bundle.js"
    },

    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new CopyWebpackPlugin(filesToCopy)
    ]
}