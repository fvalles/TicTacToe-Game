const path = require('path');

const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const portNum = 3000;
const port = process.env.PORT || portNum;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on port ${portNum}!`);
});
