var webpack = require('webpack'),
    port = 3000;

module.exports = {
    entry: [
        './lib/grid/factories/GridTemplateFactory.js'
    ],
    output: {
        'filename': 'GridTemplateFactory.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot','babel']}
        ]
    },
    devtool: 'cheap-source-map',
    resolve: {
        alias: {
            "ag-grid-root" : __dirname + "/node_modules/ag-grid"
        }
    }
};
