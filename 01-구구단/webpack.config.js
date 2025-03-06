const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'gugudan-dev',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: './client',
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', { // 옵션이 더 있는 경우
                        targets: {
                            browsers: ['> 5% in KR'],  // browserslist
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [],
            }
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    }, // 출력
}