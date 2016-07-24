var path = require("path");
var nodeModulesPath = path.join(__dirname, 'node_modules');
var HtmlWebpackPlugin = require("html-webpack-plugin");

console.log("start");

module.exports = {

    entry: {
        app: "folloze.ts"
    },

    output: {
        path: './dist/',
        filename: 'sdk-[hash].js'
    },

    devtool: 'source-map',

    module: {
        loaders: [
            { test: /\.ts?$/, loaders: ['babel?presets[]=es2015', 'ts-loader?configFileName=tsconfig.json'], exclude: "node_modules" }
        ]
    },

    tslint: {
        // Rules are in tslint.json
        emitErrors: true, // false = WARNING for webpack, true = ERROR for webpack
        formattersDirectory: path.join(nodeModulesPath, 'tslint-loader', 'formatters')
    },

    resolve: {
        root: [
            path.resolve("src"), path.resolve("test")
        ],
        extensions: ['', '.js', '.ts'],
        modulesDirectories: ["web_modules", "node_modules"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'html!test/child.html',
            filename: 'child.html',
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            template: 'html!test/host.html',
            filename: 'host.html',
            inject: 'head'
        })
    ],
};
