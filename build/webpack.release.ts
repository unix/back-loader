import * as path from 'path'
import * as webpack from 'webpack'
import * as webpackBase from './webpack.base'
import * as webpackMerge from 'webpack-merge'

module.exports = webpackMerge(webpackBase, {
  
  entry: {
    'back-loader': [path.resolve(__dirname, '../src/index.ts')],
  },
  
  output: {
    path: path.resolve(__dirname, '../release'),
    filename: '[name].js',
  },
  
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
})