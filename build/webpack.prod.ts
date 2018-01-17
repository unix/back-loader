import * as path from 'path'
import * as webpack from 'webpack'
import * as webpackBase from './webpack.base'
import * as webpackMerge from 'webpack-merge'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
const tslintConfig = require('../tslint.json')

module.exports = webpackMerge(webpackBase, {
  
  entry: {
    'app': [path.resolve(__dirname, '../examples/main.ts')],
  },
  
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js',
  },
  
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../examples/template.html'),
    }),
  
    new webpack.optimize.UglifyJsPlugin({
      mangle: { keep_fnames: true },
      sourceMap: false,
    }),
  ],
})