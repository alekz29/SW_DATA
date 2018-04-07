const webpack = require('webpack');
const path = require('path');
const distDir = path.resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpack({
    entry: ['whatwg-fetch', './src/index.js'],
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.js$/,
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {limit: 10000}
                    },
                    {
                        loader: 'img-loader'
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ],
    },
    devServer: {
        contentBase: distDir
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'static/index.html'
        })
    ],
    output: {filename: 'bundle.js', path: distDir},
});
