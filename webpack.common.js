const path = require('path');
const webpack = require('webpack');  
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [{
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: 'images/'
          },
        }]
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: 'fonts/'
          },
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // MiniCssExtractPlugin.loader,　←　CSS外部ファイル出力用
          //（復帰時は"style-loader"を削除し当ファイル内の関連の３箇所enable化。
          //必ずソースマップが出力されるのでCSSをバンドルに入れ込む"style-loader"にした）
          { loader: "style-loader" },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'tris-webpack-boilerplate',
      filename: 'index.html',
      template: './src/index.html',
      inject: 'head'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new webpack.ProvidePlugin({         // WebPack内でｊQueryを通す
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'webpack-bundle.css',
    //   chunkFilename: '[id].css'
    // })
  ],
  output: {
    filename: 'webpack-bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};