const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const filesToCopy = [
    "./index.html",
    "./subway_map.pdf"
];

const SUBWAY_STATION_URL = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getStationsByLine";
const REAL_TIME_URL = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getTime";

const DIST_DIRECTORY = "dist";

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "mta.bundle.js"
    },

    plugins: [
        new CleanPlugin([DIST_DIRECTORY]),
        new CopyPlugin(filesToCopy),
        new WorkboxPlugin.GenerateSW({
            swDest: "sw.js",
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp(REAL_TIME_URL),
                    handler: "staleWhileRevalidate"
                },
                {
                    urlPattern: new RegExp(SUBWAY_STATION_URL),
                    handler: "staleWhileRevalidate"
                }
            ]
        })
    ]
}