const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  name: 'word-relay-dev',
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
        },
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
  }, // 출력

  /* webpack-dev-server 사용시 dist 폴더는 컴퓨터 메모리(RAM)에서 생성됨.
     따라서, 개발 시에는 dist 폴더가 생성되지 않으나 정상 작동함.
   */
  devServer: {
    devMiddleware: { publicPath: '/dist' }, // 빌드 결과 위치 설정
    static: { directory: path.resolve(__dirname) }, // 실제 존재하는 정적파일들의 경로 (index.html 파일 위치)
    hot: true,  // hot reload 활성화
  },
};