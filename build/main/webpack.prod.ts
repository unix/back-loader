import * as path from 'path'
import * as webpack from 'webpack'
const tslintConfig = require('../../tslint.json')

module.exports = {
  
  entry: {
    'back-loader': [path.resolve(__dirname, '../../src/index.ts')],
  },
  
  output: {
    path: path.resolve(__dirname, '../../release'),
    filename: '[name].js',
  },
  
  resolve: {
    extensions: ['.ts', '.js'],
  },
  
  module: {
    rules: [
      {
        test: /\.ts/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
        options: {
          configuration: tslintConfig,
        },
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: path.resolve(__dirname, '../../tsconfig.json') },
          },
        ],
      },
    ],
    
    exprContextCritical: false,
  },
  
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}