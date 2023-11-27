// webpack.config.js

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/APP.js', './src/index.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串转换为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS
          'css-loader',
          // 编译 Sass 文件
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true,
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: './public/styles.scss',
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
