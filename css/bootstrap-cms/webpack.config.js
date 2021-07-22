const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const packageJson = require('./package.json');

const devMode = process.env.NODE_ENV !== 'production';
const useSass = !!(packageJson.devDependencies['node-sass']);

const styleLoader = [
  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  'postcss-loader',
];

if (useSass) {
  styleLoader.push('sass-loader');
}

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    hash: true,
    template: './src/index.html',
    filename: './index.html',
  }),
  new HtmlWebpackPlugin({
    hash: true,
    template: './src/pages.html',
    filename: './pages.html',
  }),
  new HtmlWebpackPlugin({
    hash: true,
    template: './src/posts.html',
    filename: './posts.html',
  }),
  new HtmlWebpackPlugin({
    hash: true,
    template: './src/users.html',
    filename: './users.html',
  }),
  new HtmlWebpackPlugin({
    hash: true,
    template: './src/products.html',
    filename: './products.html',
  }),
  new HtmlWebpackPlugin({
    hash: true,
    template: './src/edit.html',
    filename: './edit.html',
  }),
  new HtmlWebpackPlugin({
    hash: true,
    template: './src/login.html',
    filename: './login.html',
  }),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  }),
  new StyleLintPlugin(),
];

if (!devMode) {
  plugins.push(new CopyWebpackPlugin([{
    from: './src/favicon.ico',
  }]));
}

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: !devMode,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [...styleLoader],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug',
        ],
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
