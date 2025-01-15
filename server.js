const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;  // Use the port provided by Render or default to 8080

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'dist/ashtarangi-electricity-UI')));

// Send all other requests to the index.html file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/ashtarangi-electricity-UI/index.html'));
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
