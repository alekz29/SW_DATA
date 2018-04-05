const webpack = require('webpack');
const path = require('path');
const distDir = path.resolve(__dirname, 'dist');

const config = webpack({
    entry: ['whatwg-fetch', './js/index.js' /*path.resolve(__dirname, 'js', 'index.js')*/],
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
    output: {filename: 'app.js', path: distDir},
});
export default config
