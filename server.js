const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.js'); // Webpack config for development

const app = express();
const compiler = webpack(webpackConfig);

// Enable Webpack Dev Middleware to serve the Angular app
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}));

// Enable Webpack Hot Middleware for live-reloading
app.use(webpackHotMiddleware(compiler));

// Serve static files from the "dist" folder
app.use(express.static(path.join(__dirname, 'dist/ashtarangi-electricity-UI')));

// Catch-all route to redirect all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/ashtarangi-electricity-UI/browser', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
