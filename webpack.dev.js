const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
  entry: [
    'webpack-hot-middleware/client', // Enable Hot Module Replacement
    './src/main.ts' // Entry point for your Angular app
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'ts-loader', options: { transpileOnly: true } }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable Hot Module Replacement
    new webpack.NoEmitOnErrorsPlugin() // Prevent emitting on errors
  ]
};
