const path = require('path');

module.exports = {
    entry: './src/js/entry.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src')
            ]   ,
            test: /\.jsx?$/
        }]
    }
};
