const path = require('path'); // webpack은 Node가 돌리기 때문에 import 쓰면 에러남
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  name: 'number-baseball-dev',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extenstions: ['.js', '.jsx'],
  },

  entry:{
    app: './client',
  }, // 입력

  mode: isDevelopment? 'development' : 'production',

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              ['@babel/preset/env', {
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

  pugins:[
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  output: {
    path: path.join(__dirname, 'dist'), // 실제 경로
    filename: 'app.js',
    publicPath: '/dist/', // 가상 경로
  }, // 출력

  devServer: {
    devMiddleware: { publicPath: '/dist' }, // 빌드 결과 위치 설정
    static: { directory: path.resolve(__dirname) }, // 실제 존재하는 정적파일 위치
    hot: true, // hot reload 활성화
  },
};