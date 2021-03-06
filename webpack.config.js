var webpack = require('webpack'),
    port = 3000;

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:' + port,
        'webpack/hot/only-dev-server',
        './lib/app.js'
    ],
    output: {
        'path': './app/',
        'filename': 'app.js',
        'publicPath': '/'
    },
    watchOptions: {
        poll: 1000
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules|GridTemplate/, loaders: ['react-hot', 'babel']}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'cheap-source-map',
    devServer: {
        port: port,
        info: false,
        historyApiFallback: true,
        hot: true,
        contentBase: './app',
        host: 'localhost'
    },
    resolve: {
        alias: {
            "ag-grid-root" : __dirname + "/node_modules/ag-grid"
        }
    }
};
