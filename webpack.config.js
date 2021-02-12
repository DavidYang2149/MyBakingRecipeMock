const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEVELOPMENT_ENV = 'development';
const PRODUCTION_ENV = 'production';

const mode = process.env.NODE_ENV || DEVELOPMENT_ENV;

const pathBuild = path.resolve(__dirname, 'build');
const pathSrc = path.resolve(__dirname, 'src');
const pathIndex = path.resolve(__dirname, 'src', 'index.jsx');
const pathHtml = path.resolve(__dirname, 'public', 'index.html');

module.exports = {
  mode,
  entry: pathIndex,
  output: {
    path: pathBuild,
    filename: mode === PRODUCTION_ENV
      ? 'static/js/[name].[contenthash:8].js'
      : mode === DEVELOPMENT_ENV && 'static/js/bundle.js',
    // publicPath: './',  // './' : for build, '/' : for dev
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|PNG|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/media',
          limit: 10000,
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/media',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        include: pathSrc,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    overlay: true,
    port: 9090,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: pathHtml,
      templateParameters: {
        env: mode === DEVELOPMENT_ENV ? '(개발모드)' : '',
      },
    }),
    new CleanWebpackPlugin(),
  ],
};