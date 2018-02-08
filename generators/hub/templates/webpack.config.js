var path = require("path");
var webpack = require("webpack");

module.exports = {
    target: "web",
    entry: {
        app: "./src/app.ts"
    },
    devtool: "source-map",
    output: {
        filename: "[name].js",
        libraryTarget: "amd",
        sourceMapFilename: "[file].map"
    },
    externals: [
        /^VSS\/.*/, /^TFS\/.*/, /^q$/
    ],
    resolve: {
        extensions: ["*",".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        modules: [path.resolve("./src"),"node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: "pre",
                loader: "tslint-loader",
                options: {
                    emitErrors: true,
                    failOnHint: true
                }
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
}
