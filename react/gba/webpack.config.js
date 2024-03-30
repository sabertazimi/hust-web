const path = require('node:path')
const process = require('node:process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    main: './src/index.jsx',
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
        use: ['babel-loader'],
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
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
    new ESLintPlugin({ extensions: ['js', 'jsx'], configType: 'flat', eslintPath: 'eslint/use-at-your-own-risk' }),
    new StyleLintPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: devMode ? 'eval-cheap-module-source-map' : false,
}
