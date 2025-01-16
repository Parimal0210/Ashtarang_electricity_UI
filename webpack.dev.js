const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Set mode to development
  entry: [
    'webpack-hot-middleware/client', // Enable Hot Module Replacement
    './src/main.ts' // Entry point for your Angular app
  ],
  output: {
    path: path.resolve(__dirname, 'dist/ashtarangi-electricity-UI/browser'),
    filename: 'bundle.js',
    publicPath: '/', // Ensure paths work with your app's base path
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Use ts-loader for TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'eval-source-map', // Enable source maps for debugging
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable Hot Module Replacement
    new HtmlWebpackPlugin({
      template: './src/index.html', // Your template HTML file
      inject: 'body', // Inject JS bundle into body
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist/ashtarangi-electricity-UI/browser'),
    hot: true, // Enable Hot Module Replacement
    open: true, // Open the browser on server start
    historyApiFallback: true, // Handle SPA routing
    port: 4200, // Change this if you need a different port
  },
};
