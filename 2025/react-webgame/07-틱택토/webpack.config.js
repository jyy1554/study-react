const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const { devServer } = require('../06-로또추첨기/webpack.config');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  name: 'tictactoe-dev',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: './client',
  }, // 입력

  mode: isDevelopment ? 'development' : 'production',

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 5% in KR'],
                },
                debug: true,
              }],
              '@babel/preset-react',
            ],
            plugins: [
              isDevelopment && require.resolve('@babel/plugin-proposal-class-properties'),
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        }
      ],
    }],
  },

  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  output: {
    path: path.join(__dirname, 'dist'), // 실제 경로
    filename: 'app.js',
    publicPath: '/dist/', // 가상 경로
  },  // 출력

  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};