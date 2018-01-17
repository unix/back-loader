import * as webpack from 'webpack'
import * as path from 'path'
const tslintConfig = require('../tslint.json')

module.exports = {
  
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
            options: { configFileName: path.resolve(__dirname, '../examples/tsconfig.json') },
          },
        ],
      },
    ],
    
    exprContextCritical: false,
  },
  
  plugins: [
    
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app'],
    }),
    
  ],
}
