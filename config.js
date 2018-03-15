const webpack = require('webpack');
const path = require('path');

const config = webpack({
    entry: ['whatwg-fetch', path.resolve(__dirname, 'js', 'app.js')],
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.js$/,
            },
        ],
    },
    output: {filename: 'app.js', path: '/'},
});
export default config
