import * as path from 'path'
import * as webpackBase from './webpack.base'
import * as webpackMerge from 'webpack-merge'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = webpackMerge(webpackBase, {
  
  devtool: 'cheap-module-eval-source-map',
  
  entry: {
    'app': [path.resolve(__dirname, '../examples/main.ts')],
  },
  
  output: {
    path: path.resolve(__dirname, '../dist/output'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../examples/template.html'),
    }),
  ],
  
})
