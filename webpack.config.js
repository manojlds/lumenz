const path = require('path');

module.exports = {
    entry: './server/index.js',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.html', '.ejs', '.js', '.gql', '.graphql'],
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
        process: false,
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader?compact=false',
                exclude: /node_modules/,
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
            {
                test: /\.css$/,
                loaders: [
                    'isomorphic-style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg|\.csv|\.json$/,
                loader: 'file-loader',
                options: {
                    publicPath: '/assets/',
                    emitFile: false,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'url-loader',
            },
            {
                test: /\.scss$/,
                loaders: [
                    'isomorphic-style-loader',
                    'css-loader?minimize&modules&sourceMap&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.join(process.cwd(), './app/globals/styles/_colors.scss'),
                                path.join(process.cwd(), './app/globals/styles/_variables.scss'),
                            ],
                        },
                    },
                    'postcss-loader',
                ],
            },
        ],
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'server.js',
        publicPath: '/assets/',
        libraryTarget: 'commonjs2',
    }
}