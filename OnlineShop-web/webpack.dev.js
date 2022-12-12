const { merge } = require('webpack-merge');
var path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, './src'),
        port: 3000,
        hot: true,
        compress: true,
        open: true,
    },
});
