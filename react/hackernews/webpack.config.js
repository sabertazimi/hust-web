const path = require('path'),
      webpack = require('webpack'),
      WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const commonsPlugin =
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min.js', Infinity),
      definePlugin =
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
      providePlugin =
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
      cleanupPlugin =
        new WebpackCleanupPlugin();

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'jquery'],
        app: './src/app.js',
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: 'build/',
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=react'],
                include: path.join(__dirname, 'src')
            },
            {
                test:/\.(scss|sass)$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test:/\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192',
            },
        ]
    },
    plugins: [
        commonsPlugin,
        definePlugin,
        providePlugin,
        cleanupPlugin
    ],
    resolve: {
        extensions: ['', '.js', 'jsx', '.json']
    }
};
