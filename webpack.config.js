const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    mode: "production",
    entry: {
        content: "./src/js/content.ts",
        background: "./src/js/background.ts",
        // manifest: './src/manifest.json'
        // style: './src/css/main.css'
    },
    output: {
        path: path.resolve(__dirname, "santali-phonetic"),
        filename: "[name].js",
        // filename: '[name].[hash:7].js'
    },
    resolve: {
        extensions: [".ts", ".json", ".css", ".ttf"],
    },
    module: {
        rules: [
            // {
            //     test: /\.ttf$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 name: '[name].[ext]'
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: { allowTsInNodeModules: true },
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {
            //                 // you can specify a publicPath here
            //                 // by default it use publicPath in webpackOptions.output
            //                 publicPath: '../'
            //             }
            //         },
            //         "css-loader"
            //     ]
            // }
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: process.env.NODE_ENV ? true : false,
                    },
                },
            }),
        ],
    },
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin(),
    //         new OptimizeCSSPlugin({})
    //     ]
    // },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: './index.html',
    //         template: './src/index.html',
    //         inject: true,

    //         minify: {
    //             removeComments: true,
    //             collapseWhitespace: true,
    //             removeAttributeQuotes: true
    //         },
    //         chunksSortMode: 'dependency'
    //     }),
    //     new MiniCssExtractPlugin({
    //         filename: '[name].[hash:7].css'
    //     }),
    //     new OptimizeCSSPlugin({
    //         cssProcessorOptions: {
    //             safe: true
    //         }
    //     })
    // ]
};
